"use strict";
const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("walletAPI", {
    ping: () => ipcRenderer.invoke("ping"),
    createWalletNew: (password) => ipcRenderer.invoke("createWalletNew", password),
    createWalletFromMnemonic: (seed, password) => ipcRenderer.invoke("createWalletFromMnemonic", seed, password),
    balance: (address) => ipcRenderer.invoke("balance", address),
    updateBalance: () => ipcRenderer.invoke("updatebalance"),
    listWalletAddress: (mempass, numAddr) => ipcRenderer.invoke("listwalletaddr", mempass, numAddr)
})
