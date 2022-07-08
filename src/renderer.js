"use strict";
const form = document.getElementById("form")
const view = document.getElementById("view")
const pass = document.getElementById("pass")
const mem = document.getElementById("mnemonic")
const upd = document.getElementById("update")

form.addEventListener("submit", async (evt) => {
    evt.preventDefault()
    const resp = await globalThis.walletAPI.balance(pass.value)
    view.innerHTML = resp
})

upd.addEventListener("click", async (evt) => {
    const resp = await globalThis.walletAPI.updateBalance(pass.value)
    view.innerHTML = resp
})