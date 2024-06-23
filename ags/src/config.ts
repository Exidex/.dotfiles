import Bar from "./bar/Bar";
import { setupDateMenu } from "./bar/buttons/Date";

App.config({
    windows: [Bar(0)],
    style: './style.css'
})

const cssPath = `${App.configDir}/style.css`;

setupDateMenu()

Utils.monitorFile(
    cssPath,

    function() {
        App.resetCss()
        App.applyCss(cssPath)
    },
)