"use strict";
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const util = require('util')
const exec = util.promisify(require("child_process").exec)
const fs = require('fs')

process.env.NODE_ENV = "production"

const plm = process.platform;
const prefix = {
  linux: "./CLI/adk command",
  darwin: "/CLI/adk command",
  win32: "/CLI/adkWin.exe command"
}

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
  mainWindow.loadURL(`file://${path.join(__dirname, '../client/build/index.html')}`);

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
  ipcMain.handle("send", send);
  ipcMain.handle("checkPassword", checkPassword);
  ipcMain.handle("addAddress", addAddress)
  ipcMain.handle("listwalletaddress", listWalletAddress);
  ipcMain.handle("stake", stake);
  ipcMain.handle("unstake", unstake);
  ipcMain.handle("stakedbalance", stakedBalance);
  ipcMain.handle("multisend", multisend);
  ipcMain.handle("txInfo", txInfo);
  ipcMain.handle("mifrate", migrate)
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
    const {stdout, stderr} = await exec(path.join(__dirname, `${prefix[plm]} ping`))
    console.log(stdout)
    return stdout
  } catch (e) {
    writeLog(e)
    console.log(e)
    return JSON.stringify({
      ok: false,
      msg: "error",
      data: null
    })
  }
}

const createWalletNew = async (evt, password) => {
  try {
    console.log(password);
    const {stdout, stderr} = await exec(path.join(__dirname, `${prefix[plm]} createWalletNew ${password}`))
    return stdout;
  } catch (e) {
    writeLog(e)
    console.log(e)
    return JSON.stringify({
      ok: false,
      msg: "error",
      data: null
    })
  }
}

const createWalletFromMnemonic = async (evt, seed, password) => {
  try {
    console.log(seed, password)
    const {stdout, stderr} = await exec(path.join(__dirname, `${prefix[plm]} createWalletFromMnemonic ${seed} ${password}`))
    console.log(stdout)
    return stdout
  } catch(e) {
    writeLog(e)
    console.log(e)
    return JSON.stringify({
      ok: false,
      msg: "error",
      data: null
    })
  }
}

const balance = async (evt, address) => {
  try {
    console.log(address)
    const {stdout, stderr} = await exec(path.join(__dirname, `${prefix[plm]} balance ${address}`))
    console.log(stdout)
    return stdout
  } catch (e) {
    writeLog(e)
    console.log(e)
    return JSON.stringify({
      ok: false,
      msg: "error",
      data: null
    })
  }
}

const send = async (evt, way, mempas, from, to, amount) => {
  try {
    console.log(way, mempas, from, to, amount)
    const {stdout, stderr} = await exec(path.join(__dirname, `${prefix[plm]} send ${way} ${mempas} ${from} ${to} ${amount}`))
    console.log(stdout)
  } catch(e) {
    writeLog(e)
    console.log(e)
    return JSON.stringify({
      ok: false,
      msg: "error",
      data: null
    })
  }
}

const updateBalance = async (evt) => {
  try {
    const {stdout, stderr} = await exec(path.join(__dirname, `${prefix[plm]} updatebalance`))
    console.log(stdout)
    return stdout
  } catch (e) {
    writeLog(e)
    console.log(e)
    return JSON.stringify({
      ok: false,
      msg: "error",
      data: null
    })
  }
}

const listWalletAddress = async (evt, mempas, numAddr) => {
  try {
    const {stdout, stderr} = await exec(path.join(__dirname, `${prefix[plm]} listwalletaddr ${mempas} ${numAddr}`))
    console.log(stdout)
    return stdout
  } catch (e) {
    writeLog(e)
    console.log(e)
    return JSON.stringify({
      ok: false,
      msg: "error",
      data: null
    })
  }
}

const addAddress = async (evt, password) => {
  try {
    const {stdout, stderr} = await exec(path.join(__dirname, `${prefix[plm]} addaddress ${password}`))
    console.log(stdout)
    return stdout
  } catch (e) {
    writeLog(e)
    console.log(e)
    return JSON.stringify({
      ok: false,
      msg: "error",
      data: null
    })
  }
}

const checkPassword = async (evt, password) => {
  try {
    const {stdout, stderr} = await exec(path.join(__dirname, `${prefix[plm]} checkpassword ${password}`))
    console.log(stdout)
    return stdout
  } catch (e) {
    writeLog(e)
    console.log(e)
    return JSON.stringify({
      ok: false,
      msg: "error",
      data: null
    })
  }
}

const txInfo = async (evt, txId) => {
  try {
    const {stdout, stderr} = await exec(path.join(__dirname, `${prefix[plm]} txinfo ${txId}`))
    console.log(stdout)
    return stdout
  } catch (e) {
    writeLog(e)
    console.log(e)
    return JSON.stringify({
      ok: false,
      msg: "error",
      data: null
    })
  }
}

const loadMetamaskMnemonics = async (evt, password) => {
  try {
    const {stdout, stderr} = await exec(path.join(__dirname, `${prefix[plm]} loadMetamaskMnemonics ${password}`))
    console.log(stdout)
    return stdout
  } catch (e) {
    writeLog(e)
    console.log(e)
    return JSON.stringify({
      ok: false,
      msg: "error",
      data: null
    })
  }
}

const migrate = async (evt, old, xNew) => {
  try {
    const {stdout, stderr} = await exec(path.join(__dirname, `${prefix[plm]} migrate ${old} ${xNew}`))
    console.log(stdout)
    return stdout
  } catch (e) {
    writeLog(e)
    console.log(e)
    return JSON.stringify({
      ok: false,
      msg: "error",
      data: null
    })
  }
}

const stake = async (evt, way, mempas, from, amount) => {
  try {
    const {stdout, stderr} = await exec(path.join(__dirname, `${prefix[plm]} stake ${way} ${mempas} ${from} ${amount}`))
    console.log(stdout)
    return stdout
  } catch (e) {
    writeLog(e)
    console.log(e)
    return JSON.stringify({
      ok: false,
      msg: "error",
      data: null
    })
  }
}

const unstake = async (evt, gas, mempas, from, amount) => {
  try {
    const {stdout, stderr} = await exec(path.join(__dirname, `${prefix[plm]} unstake ${gas} ${mempas} ${from} ${amount}`))
    console.log(stdout)
    return stdout
  } catch (e) {
    writeLog(e)
    console.log(e)
    return JSON.stringify({
      ok: false,
      msg: "error",
      data: null
    })
  }
}

const stakedBalance = async (evt, ...addrs) => {
  try {
    const {stdout, stderr} = await exec(path.join(__dirname, `${prefix[plm]} stakedbalance ${addrs}`))
    console.log(stdout)
    return stdout
  } catch (e) {
    writeLog(e)
    console.log(e)
    return JSON.stringify({
      ok: false,
      msg: "error",
      data: null
    })
  }
}

const multisend = async (evt, way, mempas, to, amount) => {
  try {
    const resp = await listWalletAddress(evt, mempas, 50),
          adrs = JSON.parse(resp).data,
          balTable = {};

    let totlBal = 0;
    for (let adr of adrs) {
      const bal = JSON.parse(await balance(evt, adr)).data[adr]
      balTable[adr] = bal
      totlBal += bal
    }
    if (totlBal < amount) {
      return JSON.stringify({
            ok: false,
            msg: "not enough ADK to send",
            data: null
          })
    }

    let leftToSend = amount;
    for (let adr in balTable) {
      const bal = balTable[adr]
      if (leftToSend >= bal) {
        const resp = await send(evt, way, mempas, adr, to, bal)
        if (JSON.parse(resp).ok) {
          leftToSend -= bal
        }  else {
          return JSON.stringify({
            ok: false,
            msg: "sending error",
            data: null
          })
        }
      } else if (leftToSend < bal) {
        const sendSum = bal - leftToSend;
        const resp = await send(evt, way, mempas, adr, to, sendSum)
        if (!JSON.parse(resp).ok) {
          return JSON.stringify({
            ok: false,
            msg: "sending error",
            data: null
          })
        }
      }
    }
    return JSON.stringify({
          ok: true,
          msg: "sending was successful",
          data: null
        })
  } catch (e) {
    writeLog(e);
    console.log(e);
  }
}
