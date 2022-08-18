"use strict";
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const util = require('util')
const exec = util.promisify(require("child_process").exec)
const fs = require('fs')
const fsProm = require("fs/promises")
const cc = require("cryptocompare")
const fetch = require("node-fetch");
const nodemailer = require("nodemailer")
global.fetch = require("node-fetch")


process.env.NODE_ENV = "production"
app.disableHardwareAcceleration()

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
    height: 680,
    minWidth: 1200,
    minHeight: 680,
    maxWidth: 1200,
    maxHeight: 680,
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
  ipcMain.handle("migrate", migrate);
  ipcMain.handle("totalbalance", totalBalance);
  ipcMain.handle("loadTxsHistory", loadTxsHistory);
  ipcMain.handle("loadMetamaskMnemonics", loadMetamaskMnemonics);
  ipcMain.handle("getHistoricalDataForCoin", getHistoricalDataForCoin);
  ipcMain.handle("getAdkPrices",getAdkPrices);
  ipcMain.handle("multistake", multistake);
  ipcMain.handle("totaStake", totaStake);
  ipcMain.handle( "sendEmail", sendEmail )
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
    const {stdout, stderr} = await exec(path.join(__dirname, `${prefix[plm]} createWalletFromMnemonic ${seed} ${password}`))
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
    const {stdout, stderr} = await exec(path.join(__dirname, `${prefix[plm]} balance ${address}`))
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
    const json = await listWalletAddress(evt, mempas, 10)
    const resp = JSON.parse(json)
    const adrs = resp.data
    let totlBal = 0
    for (let adr of adrs) {
      totlBal += +(JSON.parse(await balance(evt, adr)).data[adr])
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

const totaStake = async (evt, mempas) => {
  try {
    const json = await listWalletAddress(evt, mempas, 50)
    const resp = JSON.parse(json)
    const adrs = resp.data

    let totlBal = 0
    for (let adr in adrs) {
      totlBal += +(JSON.parse(await stakedBalance(evt, adr)).data[adr])
    }
    console.log(totlBal)
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
  fs.appendFileSync("../txsHist", tx)
}

const send = async (evt, way, mempas, from, to, amount) => {
  try {
    const {stdout, stderr} = await exec(path.join(__dirname, `${prefix[plm]} send ${way} ${mempas} ${from} ${to} ${amount}`))
    const resp = JSON.parse(stdout)
    if (resp.data) {
      writeTxInHist(resp.data[0])
    }
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

const listWalletAddress = async (evt, mempas, numAddr=50) => {
  try {
    const {stdout, stderr} = await exec(path.join(__dirname, `${prefix[plm]} listwalletaddr ${mempas} ${numAddr}`))
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
    const { stdout, stderr } = await exec(path.join(__dirname, `${prefix[plm]} stake ${way} ${mempas} ${from} ${amount}`))
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
    const { stdout, stderr } = await exec(path.join(__dirname, `${prefix[plm]} unstake ${gas} ${mempas} ${from} ${amount}`))
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
      const bal = +JSON.parse(await balance(evt, adr)).data[adr]
      if (way === "pow") {
        balTable[adr] = bal
        totlSum += bal
      }
      if (way === "gas") {
        balTable[adr] = bal - GAS
        totlSum += bal - GAS
      }
    }
    if (totlSum < amount) {
      return JSON.stringify({
            ok: false,
            msg: "not enough ADK to send",
            data: null
          })
    }

    const mainAdr = Object.values(balTable)[0]

    const txs = []
    let leftToSend = amount;
    for (let adr in balTable) {
      const sum = balTable[adr]
      if (leftToSend >= sum) {
        const json = await send(evt, way, mempas, adr, mainAdr, sum)
        const resp = JSON.parse(json)
        if (resp.ok) {
          leftToSend -= sum
          txs.push(resp.data[0])
        } else return sendError
      } else if (leftToSend < sum) {
        const part = sum - leftToSend;
        const json = await send(evt, way, mempas, adr, mainAdr, part)
        const resp = JSON.parse(json)
        if (resp.ok) {
          txs.push(resp.data[0])
        } else return sendError
      }
    }
    const result = await send(evt, way, mempas, mainAdr, to, amount)
    return result
  } catch (e) {
    writeLog(e);
    console.log(e);
  }
}


const multistake = async (evt, way, mempas, amount) => {
  try {
    const resp = await listWalletAddress(evt, mempas, 50),
        adrs = JSON.parse(resp).data,
        balTable = {};

    let totlSum = 0;
    for (let adr of adrs) {
      const bal = +JSON.parse(await balance(evt, adr)).data[adr]
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

    const mainAdr = Object.values(balTable)[0]

    const txs = []
    let leftToSend = amount;
    for (let adr in balTable) {
      const sum = +balTable[adr]
      if (leftToSend >= sum) {
        const json = await send(evt, way, mempas, adr, mainAdr, sum)
        const resp = JSON.parse(json)
        if (resp.ok) {
          leftToSend -= sum
          txs.push(resp.data[0])
        } else return sendError
      } else if (leftToSend < sum) {
        const part = sum - leftToSend;
        const json = await send(evt, way, mempas, adr, mainAdr, part)
        const resp = JSON.parse(json)
        if (resp.ok) {
          txs.push(resp.data[0])
        } else return sendError
      }
    }
    const result = await stake(evt, way, mempas, mainAdr, amount)
    return result
  } catch (e) {
    writeLog(e);
    console.log(e);
  }
}

// Далее идут взаимодействия с внешними API
cc.setApiKey("a825a2d13195e4c2ddf536fd2e16ab8516d961e56b5b526d04cf6b4342d1dcd1")

const getAdkPrices = async () => {
  return await cc.price("ADK", ["USD", "EUR", "RUB", "AED", "UAH", "BYN"])
}

const getHistoricalDataForCoin = async (evt, ticket) => {
  const tickets = {
    ADK: 1706,
    ETH: 1027,
    BTC: 1,
    BNB: 1839,
    SOL: 5426,
    DOGE: 74,
    DOT: 6636,
    ADA: 2010,
    MATIC: 3890,
    AVAX: 5805
  }
  const date = new Date(),
      year = date.getFullYear(),
      month = date.getMonth(),
      day = date.getDay();
  const now = +(new Date((Date.UTC(year, month, day))).getTime()).toString().slice(0, 10)
  const monthAgo = new Date(now - 86400*30).getTime()
  return fetch(`https://api.coinmarketcap.com/data-api/v3/cryptocurrency/historical?id=${tickets[ticket]}&convertId=2781&timeStart=${monthAgo}&timeEnd=${now}`)
      .then( resp => resp.json() )
      .then( json => json.data.quotes.map( day => day.quote.open ) )
}

const sendEmail = async (evt, { mail, name, text, img }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true,
    auth: {
      user: 'aaidoswallet.supp0rt@yandex.ru',
      pass: 'nGBcgvqi7x7Z87A'
    }
  })
  let body = `<h1>${name}</h1>
<p>${mail}</p>
<p>${text}</p>
    `
  data.forEach( el => body += `<p>${el}</p>` )
  const mailOptions = {
    from: 'aaidoswallet.supp0rt@yandex.ru',
    to: "a.denisov@integerbytes.com",
    subject: "USER REQUEST",
    text: "", // plain text body
    html: body // html body
  };
  const info = await transporter.sendMail(mailOptions)
  console.log(info)
}
