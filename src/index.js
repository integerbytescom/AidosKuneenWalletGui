"use strict";
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const util = require('util')
const exec = util.promisify(require("child_process").exec)
const fs = require('fs')
const fsProm = require("fs/promises")
const cc = require("cryptocompare")
const fetch = require("node-fetch");
global.fetch = require("node-fetch")

process.env.NODE_ENV = "production"

const plm = process.platform;
const prefix = {
  linux: "./CLI/adk command",
  darwin: "/CLI/adk command",
  win32: "/CLI/adkWin.exe command"
}
console.log(plm)
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line global-require
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 660,
    minWidth: 1200,
    minHeight: 660,
    maxWidth: 1200,
    maxHeight: 660,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  // and load the index.html of the app.
  mainWindow.loadURL(`file://${path.join(__dirname, '../client/build/index.html')}`);

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
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
  ipcMain.handle("migrate", migrate);
  ipcMain.handle("totalbalance", totalBalance);
  ipcMain.handle("loadTxsHistory", loadTxsHistory);
  ipcMain.handle("loadMetamaskMnemonics", loadMetamaskMnemonics);
  ipcMain.handle("getHistoricalDataForADK", getHistoricalDataForADK);
  ipcMain.handle("getAdkPrices",getAdkPrices);
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
  fs.appendFile("../logger", err.toString(), (err) => {
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

const totalBalance = async (evt, mempas) => {
  try {
    const json = await listWalletAddress(evt, mempas, 50)
    const resp = JSON.parse(json)
    const adrs = resp.data

    let totlBal = 0
    for (let adr of adrs) {
      totlBal += JSON.parse(await balance(evt, adr)).data[adr]
    }
    return JSON.stringify({
      ok: true,
      msg: "total balance",
      data: totlBal
    })
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

const writeTxInHist = (tx) => {
  fs.appendFile("../txsHist", tx, (err) => {
    if (err) writeLog(err)
  })
}

const send = async (evt, way, mempas, from, to, amount) => {
  try {
    console.log(way, mempas, from, to, amount)
    const {stdout, stderr} = await exec(path.join(__dirname, `${prefix[plm]} send ${way} ${mempas} ${from} ${to} ${amount}`))
    const tx = JSON.parse(stdout).data[0]
    writeTxInHist(tx)
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

const loadTxsHistory = async (evt) => {
  try {
    const data = await fsProm.readFile("../txsHist", {encoding: "utf-8", flag: "r"})
    const ids = data.toString().split("\n")
    const txs = []
    for (let id of ids) {
      txs.push(JSON.stringify(JSON.parse(await txInfo(evt, id))))
    }
    return JSON.stringify({
      ok: true,
      msg: "transaction history",
      data: txs
    })
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

const GAS = 0.021
const sendError = JSON.stringify({
  ok: false,
  msg: "sending error",
  data: null
})

const multisend = async (evt, way, mempas, to, amount) => {
  try {
    const resp = await listWalletAddress(evt, mempas, 50),
          adrs = JSON.parse(resp).data,
          balTable = {};

    let totlSum = 0;
    for (let adr of adrs) {
      const bal = JSON.parse(await balance(evt, adr)).data[adr]
      if (way === "pow") {
        balTable[adr] = bal
        totlSum += bal
      }
      if (way === "gas") {
        balTable[adr] = bal - GAS
        totlSum += bal - GAS
      }
    }
    if (totlBal < amount) {
      return JSON.stringify({
            ok: false,
            msg: "not enough ADK to send",
            data: null
          })
    }
    const txs = []
    let leftToSend = amount;
    for (let adr in balTable) {
      const sum = balTable[adr]
      if (leftToSend >= sum) {
        const json = await send(evt, way, mempas, adr, to, sum)
        const resp = JSON.parse(json)
        if (resp.ok) {
          leftToSend -= sum
          txs.push(resp.data[0])
        } else return sendError
      } else if (leftToSend < sum) {
        const part = sum - leftToSend;
        const json = await send(evt, way, mempas, adr, to, part)
        const resp = JSON.parse(json)
        if (resp.ok) {
          txs.push(resp.data[0])
          return JSON.stringify({
            ok: true,
            msg: "sending was successful",
            data: txs
          })
        } else return sendError
      }
    }
  } catch (e) {
    writeLog(e);
    console.log(e);
  }
}

// ?????????? ???????? ???????????????????????????? ?? ???????????????? API
cc.setApiKey("a825a2d13195e4c2ddf536fd2e16ab8516d961e56b5b526d04cf6b4342d1dcd1")

const getAdkPrices = async () => {
  return await cc.price("ADK", ["USD", "EUR", "RUB", "AED", "UAH", "BYN"])
}

const getHistoricalDataForADK = async () => {
  const date = new Date(),
      year = date.getFullYear(),
      month = date.getMonth(),
      day = date.getDay();
  const now = +(new Date((Date.UTC(year, month, day))).getTime()).toString().slice(0, 10)
  const monthAgo = new Date(now - 86400*30).getTime()
  const resp = await fetch(`https://api.coinmarketcap.com/data-api/v3/cryptocurrency/historical?id=1706&convertId=2781&timeStart=${monthAgo}&timeEnd=${now}`, {
    method: "get",
    headers: {
      "User-Agent": "PostmanRuntime/7.29.0",
      "Accept": "*/*",
      "Accept-Encoding": "gzip, deflate, br"
    }
  })
  const data = (await resp.json())
      .data
      .quotes
      .map( (day) => day.quote.open)
  return data
}

/*
{
  "ok": true,
  "msg": "TX sent and mined",
  "data": [
    "0x97f22edf676c9e8e0973fcd48188ab5a7b0d878f15ee131b6dc1d62160a3a333"
  ]
}
* */