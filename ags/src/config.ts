import Bar from "./bar/Bar";
import { setupDateMenu } from "./bar/buttons/Date";
import { setupQuickSettings } from "./quicksettings/QuickSettings";

console.log(App.iconTheme);
console.log(App.cursorTheme);
console.log(App.gtkTheme);
// console.log(Gtk.IconTheme.get_default().get_search_path());

const cssPath = `${App.configDir}/style.css`;

App.config({
    windows: [Bar(0)],
    style: cssPath
})

setupDateMenu()
setupQuickSettings()

Utils.monitorFile(
    cssPath,

    function() {
        App.resetCss()
        App.applyCss(cssPath)
    },
)