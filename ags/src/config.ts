import Bar from "./bar/Bar";
import { setupDateMenu } from "./bar/buttons/Date";
import { setupQuickSettings } from "./quicksettings/QuickSettings";

App.config({
    windows: [Bar(0)],
    style: './style.css'
})

const cssPath = `${App.configDir}/style.css`;

setupDateMenu()
setupQuickSettings()

Utils.monitorFile(
    cssPath,

    function() {
        App.resetCss()
        App.applyCss(cssPath)
    },
)