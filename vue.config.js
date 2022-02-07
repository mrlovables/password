let path = require("path");
function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    chainWebpack: (config) => {
        config.resolve.alias.set("@", resolve("src"));
    },

    pluginOptions: {
        quasar: {
            importStrategy: "kebab",
            rtlSupport: true,
        },
        electronBuilder: {
            preload: "./src/preload.js",
            externals: ["electron"],
            builderOptions: {
                // options placed here will be merged with default configuration and passed to electron-builder
            },
            nodeIntegration: true,
            contextIsolation: false,
        },
    },

    transpileDependencies: ["quasar"],
};
