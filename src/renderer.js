"use strict";
const form = document.getElementById("form")
const way = document.getElementById("way")
const pass = document.getElementById("pass")
const to = document.getElementById("to")
const amount = document.getElementById("amount")
//const btn = document.getElementById("btn")
const res = document.getElementById("res")

form.addEventListener("submit", async (evt) => {
    evt.preventDefault()
    const resp = await globalThis.walletAPI.multisend(way.value, pass.value, to.value, amount.value)
    res.innerHTML = JSON.parse(resp).msg
})