const { app, BrowserWindow, ipcMain, shell, protocol } = require('electron')
const DiscordRPC = require('discord-rpc')
const path = require('path')
const url = require('url')
const isDev = require('electron-is-dev')
let ipc = ipcMain
var mainWindow

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 750,
    minWidth: 700,
    minHeight: 500,
    center: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    frame: false,
    show: false,
    resizable: true,
  })

  ipc.on('window_close', (event, arg) => {
    mainWindow.close()
  })

  ipc.on('window_minimize', (event, arg) => {
    mainWindow.minimize()
  })

  ipc.on('window_toggle_maximize', (event, arg) => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize()
    } else {
      mainWindow.maximize()
    }
  })

  ipc.on('open_url', (event, arg) => {
    shell.openExternal(arg)
  })

  console.log(`Development environment: ${isDev}`)
  process.env.CODA_DEVELOPMENT_ENVIRONMENT = isDev

  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, '/build/index.html'),
      protocol: 'file:',
      slashes: true,
    })

  mainWindow.loadURL(startUrl)

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    mainWindow.focus()
  })

  mainWindow.once('show', () => {
    mainWindow.focus()
    setTimeout(() => {
      mainWindow.focus()
    }, 400)
  })

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', () => {
  createWindow()
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

const clientId = '1017047174686715975'

DiscordRPC.register(clientId)

const rpc = new DiscordRPC.Client({ transport: 'ipc' })

async function setActivity() {
  if (!rpc || !mainWindow) {
    return
  }
  rpc.setActivity({
    details: 'Idling',
  })
}

rpc.on('ready', () => {
  setActivity()
})

rpc.login({ clientId }).catch(console.error)
