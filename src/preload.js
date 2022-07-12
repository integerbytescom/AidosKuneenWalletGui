"use strict";
const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("walletAPI", {
    ping: () => ipcRenderer.invoke("ping"),
    createWalletNew: (password) => ipcRenderer.invoke("createWalletNew", password),
    createWalletFromMnemonic: (seed, password) => ipcRenderer.invoke("createWalletFromMnemonic", seed, password),
    balance: (address) => ipcRenderer.invoke("balance", address),
    updateBalance: () => ipcRenderer.invoke("updatebalance"),
    listWalletAddress: (mempass, numAddr) => ipcRenderer.invoke("listwalletaddress", mempass, numAddr),
    stake: (way, mempas, from, amount) => ipcRenderer.invoke("stake", way, mempas, from, amount),
    unstake: (gas, mempas, from, amount) => ipcRenderer.invoke("unstake", gas, mempas, from, amount),
    stakedBalance: (...addrs) => ipcRenderer.invoke("stakedbalance", ...addrs),
    multisend: (way, mempas, to, amount) => ipcRenderer.invoke("multisend", way, mempas, to, amount)
})
