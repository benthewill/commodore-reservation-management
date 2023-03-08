const { app, BrowserWindow} = require('electron')
app.whenReady().then(() => {
    new BrowserWindow().loadURL(process.env.VITE_DEV_SERVER_URL)
})
