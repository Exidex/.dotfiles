import PanelButton from "../PanelButton"
import icons from "../../icons";

const POWER_MENU_WINDOW_NAME = "powermenu";

export default () => PanelButton({
    on_clicked: () => App.toggleWindow(POWER_MENU_WINDOW_NAME),
    child: Widget.Icon(icons.powermenu.shutdown),
    setup: self => {
        self.toggleClassName("colored", true)
        self.toggleClassName("box")
    },
})
