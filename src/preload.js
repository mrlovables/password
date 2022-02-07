// const { contextBridge, ipcRenderer } = require("electron");
// const { ref } = require("vue");

// contextBridge.exposeInMainWorld("darkMode", {
//     toggle: () => ipcRenderer.invoke("dark-mode:toggle"),
//     system: () => ipcRenderer.invoke("dark-mode:system"),
// });

// contextBridge.exposeInMainWorld("ipcRenderer", {
// proxy: () => {
//     return ipcRenderer;
// },
// resized: () => {
//     const msg = ref(0);
//     ipcRenderer.on("resized", (event, message) => {
//         msg.value = decodeURIComponent(message);
//         console.log(msg.value);
//     });
//     console.log("resized");
//     return msg;
// },
// });

const { ipcRenderer } = require("electron");
window.ipcRenderer = ipcRenderer;
