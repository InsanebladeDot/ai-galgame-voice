// electron/main.ts
import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'

// 处理路径
const isDev = !app.isPackaged
const PORT = 5173 // Vite 默认端口

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, '../dist/electron/preload.js'),
      contextIsolation: true,
      sandbox: false
    },
    icon: path.join(__dirname, '../public/icon.ico') // 可选
  })

  if (isDev) {
    // 开发模式：加载 Vite 开发服务器
    win.loadURL(`http://localhost: $ {PORT}`)
    win.webContents.openDevTools() // 自动打开开发者工具
  } else {
    // 生产模式：加载本地 dist 文件
    win.loadFile(path.join(__dirname, '../dist/index.html'))
  }
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})