const { app, BrowserWindow} = require('electron')
app.whenReady().then(() => {
    new BrowserWindow({
        width: 1600,
        height: 1200
    }).loadURL(process.env.VITE_DEV_SERVER_URL)
})
