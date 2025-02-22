#!/usr/bin/env -S deno run -A

import { parse, stringify } from "jsr:@libs/xml@6.0.4";

const to = prompt("Enter 'linux' or 'macos':");

if (!to || (to != "linux" && to != "macos")) {
    throw Error("bad input");
}

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
    ["keyboard-shortcut"]: KeyboardShortcut;
}

interface KeyboardShortcut {
    ["@first-keystroke"]: string;
    ["@second-keystroke"]: string;
}

const keymap: KeymapFile = parse(Deno.readTextFileSync(fromFile));

const doNotConvertCtrlToMeta = [
    "EditorCloneCaretAbove",
    "EditorCloneCaretBelow",
    "NextTab",
    "PreviousTab",
    "ShowPopupMenu", // TODO remove
];

keymap.keymap["@name"] = keymap.keymap["@name"].replace("linux", "macos");

keymap
    .keymap
    .action
    .map((action) => {
        const shortcut = action["keyboard-shortcut"];
        if (shortcut) {
            if (!doNotConvertCtrlToMeta.includes(action["@id"])) {
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
            }
        }

        return action;
    });

Deno.writeTextFileSync(toFile, stringify(keymap));
