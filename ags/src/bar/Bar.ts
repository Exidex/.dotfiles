import Date from "./buttons/Date"
import SysTray from "./buttons/SysTray"
import QuickSettingsMenu from "./buttons/QuickSettingsMenu";

export default (monitor: number) => Widget.Window({
    monitor,
    className: "bar",
    name: `bar${monitor}`,
    exclusivity: "exclusive",
    anchor: ["top", "right", "left"],
    child: Widget.CenterBox({
        startWidget: Widget.Box({
            hexpand: true,
            children: [
                Widget.Box({ expand: true })
            ],
        }),
        centerWidget: Widget.Box({
            hpack: "center",
            children: [
                Date()
            ],
        }),
        endWidget: Widget.Box({
            hexpand: true,
            children: [
                Widget.Box({ expand: true }),
                SysTray(),
                QuickSettingsMenu(),
            ],
        }),
    }),
})
