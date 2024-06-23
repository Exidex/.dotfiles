import Date from "./buttons/Date"
import PowerMenu from "./buttons/PowerMenu"
import SysTray from "./buttons/SysTray"
import SystemIndicators from "./buttons/SystemIndicators"

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
                SystemIndicators(),
                PowerMenu(),
            ],
        }),
    }),
})
