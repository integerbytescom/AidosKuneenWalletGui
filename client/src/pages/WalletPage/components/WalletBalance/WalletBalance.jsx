import React, {useEffect, useState} from 'react';
import './WalletBalance.css';
import {anFade, anFade1s, anFadeOut} from "../../../../animations";
import {useNavigate} from "react-router-dom";

const WalletBalance = (props) => {

    const [blueClass,setBlueClass] = useState('')

    const [balance,setBalance] = useState(null)

    const [usdValue,setUsdValue] = useState(null)

    const [fade,setFade] = useState(anFade)
    const [fade1s,setFade1s] = useState(anFade1s)

    const navigate = useNavigate()

    const handleCloseWallet = (url) =>{
        props.setFadeExit(anFadeOut)
        setTimeout(() => navigateRoute(url),1000)
    }
    const navigateRoute = (url) =>{
        navigate(url)
    }

    useEffect(() => {

        const showBalance = async () =>{
            const adress = localStorage.getItem('adress')
            const balance = JSON.parse(await window.walletAPI.balance(adress))
            console.log(balance)
            setBalance(balance.data[adress]/1000000000000000000)
        }
        showBalance()
        const showValuesADK = async () =>{
            const values = await window.walletAPI.getAdkPrices()
            setUsdValue(values.USD)
            console.log(values.USD)
        }
        showValuesADK()

        if (props.path === '/wallet'){
            setBlueClass('')
        }else {
            setBlueClass('blue')
        }
    },[])

    return (
        <>
            {
                blueClass === 'blue'?
                    <img className={`fon-wallet-bal ${fade}`} src="./images/wallet-page/waves-shd-blue.svg" alt=""/>:
                    <img className={`fon-wallet-bal ${fade}`} src="./images/wallet-page/waves-shd.svg" alt=""/>
            }

            <div className={`container-top-wallet ${fade1s}`}>
                <div className="bal-container">
                    {
                        blueClass === 'blue'?
                            <img src="./images/wallet-page/logoKrugBlue.svg" alt=""/>:
                            <img src="./images/wallet-page/logoKrug.svg" alt=""/>
                    }
                    <h1 className={blueClass}>{balance} ADK</h1>
                    <h2 className={blueClass}>{balance * usdValue} $</h2>
                </div>

                <div className="butt-container">
                    {
                        blueClass === 'blue'?
                            <>
                                <button className={`border-button ${blueClass}`} onClick={() => handleCloseWallet('/wallet/stake')}>Stake</button>
                                <button className={`border-button ${blueClass}`} onClick={() => handleCloseWallet('/wallet/unstake')}>Unstake</button>
                            </>:
                            <>
                                <button className={`border-button ${blueClass}`} onClick={() => handleCloseWallet('/wallet/send')}>Send</button>
                                <button className={`border-button ${blueClass}`} onClick={() => handleCloseWallet('/wallet/receive')}>Receive</button>
                            </>
                    }
                </div>
            </div>
        </>
    );
};

export default WalletBalance;