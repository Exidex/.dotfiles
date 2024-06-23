import PanelButton from "../PanelButton"
import icons from "../../icons";

const bluetooth = await Service.import("bluetooth")
const audio = await Service.import("audio")
const network = await Service.import("network")

const MicrophoneIndicator = () => Widget.Icon()
    .hook(audio, self => {
        return self.visible = (
            audio.recorders.length > 0 || audio.microphone.stream?.is_muted || audio.microphone.is_muted || false
        )
    })
    .hook(audio.microphone, self => {
        const vol = audio.microphone.stream!.is_muted ? 0 : audio.microphone.volume
        const { muted, low, medium, high } = icons.audio.mic
        const cons = [[67, high], [34, medium], [1, low], [0, muted]] as const
        self.icon = cons.find(([n]) => n <= vol * 100)?.[1] || ""
    })

const BluetoothIndicator = () => Widget.Overlay({
    class_name: "bluetooth",
    passThrough: true,
    child: Widget.Icon({
        icon: icons.bluetooth.enabled,
        visible: bluetooth.bind("enabled"),
    }),
    overlay: Widget.Label({
        hpack: "end",
        vpack: "start",
        label: bluetooth.bind("connected_devices").as(c => `${c.length}`),
        visible: bluetooth.bind("connected_devices").as(c => c.length > 0),
    }),
})

const NetworkIndicator = () => Widget.Icon().hook(network, self => {
    const icon = network[network.primary || "wifi"]?.icon_name
    self.icon = icon || ""
    self.visible = !!icon
})

const AudioIndicator = () => Widget.Icon({
    icon: audio.speaker.bind("volume").as(vol => {
        const { muted, low, medium, high, overamplified } = icons.audio.volume
        const cons = [[101, overamplified], [67, high], [34, medium], [1, low], [0, muted]] as const
        const icon = cons.find(([n]) => n <= vol * 100)?.[1] || ""
        return audio.speaker.is_muted ? muted : icon
    }),
})

export default () => PanelButton({
    on_clicked: () => App.toggleWindow("quicksettings"),
    child: Widget.Box([
        BluetoothIndicator(),
        NetworkIndicator(),
        AudioIndicator(),
        MicrophoneIndicator(),
    ]),
})
