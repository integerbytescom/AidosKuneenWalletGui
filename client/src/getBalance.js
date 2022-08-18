export const getBalance = async () =>{
    const seed = window.localStorage.getItem('seed');
    const balance = JSON.parse(await window.walletAPI.totalBalance(`"${seed}"`));
    // console.log(balance)
    // console.log(+balance.data)
    const bal = +balance.data/1000000000000000000;
    const checkBal = bal?bal:localStorage.getItem('totalBalance')
    window.localStorage.setItem('totalBalance',checkBal)
    return checkBal
}