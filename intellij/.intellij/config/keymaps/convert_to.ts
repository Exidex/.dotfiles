#!/usr/bin/env -S deno run -A

import { parse, stringify } from "jsr:@libs/xml@6.0.4";
import { parseArgs } from "jsr:@std/cli/parse-args";
import { assert } from "jsr:@std/assert";

const flags = parseArgs(Deno.args, {
    string: ["to"],
});

const to = flags.to;

assert(to != null)
assert(to == "linux" || to == "macos")

const fromFile = to == "macos"
    ? "new keeb full linux.xml"
    : "new keeb full macos.xml";
const toFile = to == "macos"
    ? "new keeb full macos.xml"
    : "new keeb full linux.xml";

interface KeymapFile {
    keymap: Keymap;
}

interface Keymap {
    ["@version"]: string;
    ["@name"]: string;
    action: Action[];
}

interface Action {
    ["@id"]: string;
    ["keyboard-shortcut"]?: KeyboardShortcut | KeyboardShortcut[];
}

interface KeyboardShortcut {
    ["@first-keystroke"]: string;
    ["@second-keystroke"]?: string;
}

// deno-lint-ignore no-explicit-any
const keymap: KeymapFile = parse(Deno.readTextFileSync(fromFile)) as any;

const doNotConvertCtrlToMeta = [
    "EditorCloneCaretAbove",
    "EditorCloneCaretBelow",
    "NextTab",
    "PreviousTab",
    "ShowPopupMenu", // TODO remove
];

const set: { [id: string]: Action | undefined } = {
    "NextProjectWindow": to != "linux" ? undefined : {
        "@id": "NextProjectWindow",
        "keyboard-shortcut": { "@first-keystroke": "shift ctrl close_bracket" }
    },
    "PreviousProjectWindow": to != "linux" ? undefined : {
        "@id": "PreviousProjectWindow",
        "keyboard-shortcut": { "@first-keystroke": "shift ctrl open_bracket" }
    },
};

keymap.keymap["@name"] = keymap.keymap["@name"].replace("linux", "macos");

keymap
    .keymap
    .action
    .map((action) => {
        const shortcuts = action["keyboard-shortcut"];
        if (shortcuts) {
            if (Array.isArray(shortcuts)) {
                // noop for now
            } else {
                const actionId = action["@id"];
                if (actionId in set) {
                    const toSet = set[actionId];
                    if (toSet == undefined) {
                        delete action["keyboard-shortcut"];
                    } else {
                        return toSet
                    }
                }

                if (!doNotConvertCtrlToMeta.includes(actionId)) {
                    return processShortcut(shortcuts)
                }
            }
        }

        return shortcuts
    });

// deno-lint-ignore no-explicit-any
Deno.writeTextFileSync(toFile, stringify(keymap as any));

function processShortcut(shortcut: KeyboardShortcut): KeyboardShortcut | undefined {
    if (shortcut["@first-keystroke"]) {
        switch (to) {
            case "linux": {
                shortcut["@first-keystroke"] = shortcut["@first-keystroke"]
                    .replace("meta", "ctrl");
                break;
            }
            case "macos": {
                shortcut["@first-keystroke"] = shortcut["@first-keystroke"]
                    .replace("ctrl", "meta");
                break;
            }
        }
    }
    if (shortcut["@second-keystroke"]) {
        switch (to) {
            case "linux": {
                shortcut["@second-keystroke"] = shortcut["@second-keystroke"]
                    .replace("meta", "ctrl");
                break;
            }
            case "macos": {
                shortcut["@second-keystroke"] = shortcut["@second-keystroke"]
                    .replace("ctrl", "meta");
                break;
            }
        }
    }

    return shortcut
}
