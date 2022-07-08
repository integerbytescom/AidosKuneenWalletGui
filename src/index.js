"use strict";
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const util = require('util')
const exec = util.promisify(require("child_process").exec)
const fs = require('fs')

process.env.NODE_ENV = "production"

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line global-require
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  ipcMain.handle("ping", ping);
  ipcMain.handle("createWalletNew", createWalletNew);
  ipcMain.handle("createWalletFromMnemonic", createWalletFromMnemonic);
  ipcMain.handle("balance", balance);
  ipcMain.handle("updatebalance", updateBalance);
  ipcMain.handle("listwalletaddr", listWalletAddress)
  createWindow()
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

const writeLog = (err) => {
  fs.appendFile("../logger.txt", err.toString(), (err) => {
    if (err) writeLog(err)
  })
}

const ping = async () => {
  try {
    const {stdout, stderr} = await exec(path.join(__dirname, "./CLI/adk command ping"))
    console.log(stdout)
    return stdout
  } catch (e) {
    writeLog(e);
    console.log(e);
  }
}

const createWalletNew = async (evt, password) => {
  try {
    console.log(password);
    const {stdout, stderr} = await exec(path.join(__dirname, `./CLI/adk command createWalletNew ${password}`))
    return stdout;
  } catch (e) {
    writeLog(e)
    console.log(e)
  }
}

const createWalletFromMnemonic = async (evt, seed, password) => {
  try {
    console.log(seed, password)
    const {stdout, stderr} = await exec(path.join(__dirname, `./CLI/adk command createWalletFromMnemonic ${seed} ${password}`))
    console.log(stdout)
    return stdout
  } catch(e) {
    writeLog(e)
    console.log(e)
  }
}

const balance = async (evt, address) => {
  try {
    console.log(address)
    const {stdout, stderr} = await exec(path.join(__dirname, `./CLI/adk command balance ${address}`))
    console.log(stdout)
    return stdout
  } catch (e) {
    writeLog(e)
    console.log(e)
  }
}

const send = async (evt, way, mempas, from, to, amount) => {
  try {
    console.log(way, mempas, from, to, amount)
    const {stdout, stderr} = await exec(path.join(__dirname, `./CLI/adk command send ${way} ${mempas} ${from} ${to} ${amount}`))
    console.log(stdout)
  } catch(e) {
    writeLog(e)
    console.log(e)
  }
}

const updateBalance = async (evt) => {
  try {
    const {stdout, stderr} = await exec(path.join(__dirname, `./CLI/adk command updatebalance`))
    console.log(stdout)
    return stdout
  } catch (e) {
    writeLog(e)
    console.log(e)
  }
}

const listWalletAddress = async (evt, mempas, numAddr) => {
  try {
    const {stdout, stderr} = await exec(path.join(__dirname, `./CLI/adk command listwalletaddr ${mempas} ${numAddr}`))
    console.log(stdout)
    return stdout
  } catch (e) {
    writeLog(e)
    console.log(e)
  }
}

const addAddress = async (evt, password) => {
  try {
    const {stdout, stderr} = await exec(path.join(__dirname, `./CLI/adk command addaddress ${password}`))
    console.log(stdout)
    return stdout
  } catch (e) {
    writeLog(e)
    console.log(e)
  }
}

const checkPassword = async (evt, password) => {
  try {
    const {stdout, stderr} = await exec(path.join(__dirname, `./CLI/adk command checkpassword ${password}`))
    console.log(stdout)
    return stdout
  } catch (e) {
    writeLog(e)
    console.log(e)
  }
}

const txInfo = async (evt, txId) => {
  try {
    const {stdout, stderr} = await exec(path.join(__dirname, `./CLI/adk command txinfo ${txId}`))
    console.log(stdout)
    return stdout
  } catch (e) {
    writeLog(e)
    console.log(e)
  }
}

const loadMetamaskMnemonics = async (evt, password) => {
  try {
    const {stdout, stderr} = await exec(path.join(__dirname, `./CLI/adk command loadMetamaskMnemonics ${password}`))
    console.log(stdout)
    return stdout
  } catch (e) {
    writeLog(e)
    console.log(e)
  }
}

const migrate = async (evt, old, xNew) => {
  try {
    const {stdout, stderr} = await exec(path.join(__dirname, `./CLI/adk command migrate ${old} ${xNew}`))
    console.log(stdout)
    return stdout
  } catch (e) {
    writeLog(e)
    console.log(e)
  }
}