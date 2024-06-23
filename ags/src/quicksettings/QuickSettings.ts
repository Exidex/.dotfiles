import type Gtk from "gi://Gtk?version=3.0"
import { Header } from "./widgets/Header"
import { Volume, Microphone, SinkSelector, AppMixer } from "./widgets/Volume"
import { NetworkToggle, WifiSelection } from "./widgets/Network"
import { BluetoothToggle, BluetoothDevices } from "./widgets/Bluetooth"
import PopupWindow from "../bar/PopupWindow";

const Row = (
    toggles: Array<() => Gtk.Widget> = [],
    menus: Array<() => Gtk.Widget> = [],
) => Widget.Box({
    vertical: true,
    children: [
        Widget.Box({
            homogeneous: true,
            class_name: "row horizontal",
            children: toggles.map(w => w()),
        }),
        ...menus.map(w => w()),
    ],
})

const Settings = () => Widget.Box({
    vertical: true,
    class_name: "quicksettings vertical",
    css: "min-width: 380px;",
    children: [
        Header(),
        Widget.Box({
            class_name: "sliders-box vertical",
            vertical: true,
            children: [
                Row(
                    [Volume],
                    [SinkSelector, AppMixer],
                ),
                Microphone(),
            ],
        }),
        Row(
            [NetworkToggle, BluetoothToggle],
            [WifiSelection, BluetoothDevices],
        ),
    ],
})

const QuickSettings = () => PopupWindow({
    name: "quicksettings",
    exclusivity: "exclusive",
    transition: "slide_down",
    layout: "top-right",
    child: Settings(),
})

export function setupQuickSettings() {
    App.addWindow(QuickSettings())
}