import PanelButton from "../PanelButton"
import icons from "../../icons";
import { icon } from "../../lib/utils";

const bluetooth = await Service.import("bluetooth")
const audio = await Service.import("audio")
const network = await Service.import("network")

const QUICK_SETTINGS_WINDOW_NAME = "quicksettings";

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
        self.icon = icon(cons.find(([n]) => n <= vol * 100)?.[1] || "")
    })

const BluetoothIndicator = () => Widget.Icon({
    class_name: "bluetooth",
    icon: icons.bluetooth.enabled,
    visible: bluetooth.bind("enabled"),
})

const NetworkIndicator = () => Widget.Icon().hook(network, self => {
    const wifiIcon = network[network.primary || "wifi"]?.icon_name
    self.icon = icon(wifiIcon || "")
    self.visible = !!wifiIcon
})

const AudioIndicator = () => Widget.Icon({
    icon: audio.speaker
        .bind("volume")
        .as(vol => {
            const { muted, low, medium, high, overamplified } = icons.audio.volume
            const cons = [[101, overamplified], [67, high], [34, medium], [1, low], [0, muted]] as const
            const icon = cons.find(([n]) => n <= vol * 100)?.[1] || ""
            return audio.speaker.is_muted ? muted : icon
        }),
})

const PowerIcon = () => Widget.Icon(icons.powermenu.shutdown)

export default () => PanelButton({
    window: QUICK_SETTINGS_WINDOW_NAME,
    on_clicked: () => App.toggleWindow(QUICK_SETTINGS_WINDOW_NAME),
    child: Widget.Box({
        children: [
            NetworkIndicator(),
            BluetoothIndicator(),
            AudioIndicator(),
            MicrophoneIndicator(),
            PowerIcon(),
        ],
        homogeneous: true
    }),
})
