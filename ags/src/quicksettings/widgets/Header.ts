import powermenu, { Action } from "../../service/powermenu"
import icons from "../../icons";

const SysButton = (action: Action) => Widget.Button({
    vpack: "center",
    child: Widget.Icon(icons.powermenu[action]),
    on_clicked: () => powermenu.action(action),
})

export const Header = () => Widget.Box(
    { class_name: "header horizontal" },
    Widget.Button({
        vpack: "center",
        child: Widget.Icon(icons.ui.screenshot),
        on_clicked: () => {

        },
    }),
    Widget.Button({
        vpack: "center",
        child: Widget.Icon(icons.ui.settings),
        on_clicked: () => {
            App.closeWindow("quicksettings")
            App.closeWindow("settings-dialog")
            App.openWindow("settings-dialog")
        },
    }),
    Widget.Box({ hexpand: true }),
    Widget.Button({
        vpack: "center",
        child: Widget.Icon(icons.ui.lock),
        on_clicked: () => {

        },
    }),
    SysButton("logout"),
    SysButton("shutdown"),
)