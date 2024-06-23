import PanelButton from "../PanelButton"
import GLib from "gi://GLib";
import PopupWindow from "../PopupWindow";

const clock = Variable(GLib.DateTime.new_now_local(), {
    poll: [1000, () => GLib.DateTime.new_now_local()],
})

const DATE_MENU_WINDOW_NAME = "datemenu";

const DateMenu = () => PopupWindow({
    name: DATE_MENU_WINDOW_NAME,
    exclusivity: "exclusive",
    transition: "slide_down",
    layout: "top-center",
    child: Widget.Box({
        class_name: "datemenu-inner",
        vexpand: false,
        children: [
            Widget.Calendar({
                hpack: "center",
                className: "calendar"
            })
        ],
    }),
})

export function setupDateMenu() {
    App.addWindow(DateMenu())
}

export default () => PanelButton({
    on_clicked: () => App.toggleWindow(DATE_MENU_WINDOW_NAME),
    child: Widget.Label({
        label: clock.bind().as(c => c.format("%a %d %b  %H:%M:%S") || "")
    }),
})