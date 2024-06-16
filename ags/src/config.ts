import Bar from "./bar/Bar";

App.config({
    windows: [Bar(0)],
    style: './styles.css'
})

const cssPath = `${App.configDir}/styles.css`;


Utils.monitorFile(
    cssPath,

    function() {
        App.resetCss()
        App.applyCss(cssPath)
    },
)