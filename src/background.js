"use strict";

import { app, protocol, BrowserWindow, ipcMain, nativeTheme, Menu } from "electron";
// import { Console } from 'console';
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS3_DEVTOOLS } from "electron-devtools-installer";
import path from "path";
// import { ref } from "vue";

const isDevelopment = process.env.NODE_ENV !== "production";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: "app", privileges: { secure: true, standard: true } }]);
// app.console = new Console({ stdout: process.stdout, stderr: process.stderr });
app.commandLine.appendSwitch("enable-logging");
app.name = "账号簿";
async function createWindow() {
    // Create the browser window.
    console.log(process.env.ELECTRON_NODE_INTEGRATION);
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        title: "账号簿",
        webPreferences: {
            // Use pluginOptions.nodeIntegration, leave this alone
            // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
            nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
            contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
            // contextIsolation: true,
            enableRemoteModule: true,

            preload: path.join(process.cwd(), "src/preload.js"),
        },
    });

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
        if (!process.env.IS_TEST) win.webContents.openDevTools();
    } else {
        createProtocol("app");
        // Load the index.html when not in development
        win.loadURL("app://./index.html");
    }

    win.setMinimumSize(800, 600);

    // ipcMain.handle("dark-mode:toggle", () => {
    //     if (nativeTheme.shouldUseDarkColors) {
    //         nativeTheme.themeSource = "light";
    //     } else {
    //         nativeTheme.themeSource = "dark";
    //     }
    //     return nativeTheme.shouldUseDarkColors;
    // });

    ipcMain.handle("dark-mode:system", () => {
        nativeTheme.themeSource = "system";
    });

    win.on("resized", () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        // process.stdout.write(win.id);
        // app.console.log(win.id);

        win.webContents.send("resized", win.getSize());
    });

    win.webContents.send("homePath", app.getPath("home"));
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        try {
            await installExtension(VUEJS3_DEVTOOLS);
        } catch (e) {
            console.error("Vue Devtools failed to install:", e.toString());
        }
    }
    createWindow();
});

app.on("before-quit", () => {
    BrowserWindow.getAllWindows()[0].webContents.send("destroyed", [800, 600]);
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === "win32") {
        process.on("message", (data) => {
            if (data === "graceful-exit") {
                app.quit();
            }
        });
    } else {
        process.on("SIGTERM", () => {
            app.quit();
        });
    }
}

const isMac = process.platform === "darwin";

const template = [
    // { role: 'appMenu' }
    ...(isMac
        ? [
              {
                  label: app.name,
                  submenu: [
                      { role: "about" },
                      { type: "separator" },
                      { role: "hide" },
                      { role: "hideOthers" },
                      { role: "unhide" },
                      { type: "separator" },
                      { role: "close" },
                      { role: "quit" },
                  ],
              },
          ]
        : []),
    // { role: 'viewMenu' }
    {
        label: "View",
        submenu: [
            { role: "reload" },
            { role: "forceReload" },
            { role: "toggleDevTools" },
            { type: "separator" },
            { role: "minimize" },
            { role: "zoom" },
            { role: "togglefullscreen" },
        ],
    },
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
