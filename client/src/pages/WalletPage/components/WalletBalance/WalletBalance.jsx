import React, {useEffect, useState} from 'react';
import './WalletBalance.css';
import {anFadeDown, anFadeOut} from "../../../../animations";
import {useNavigate} from "react-router-dom";
import {checkLightTheme} from "../../../../lightThemeCheck";

const WalletBalance = (props) => {

    const [blueClass,setBlueClass] = useState('')

    const [balance,setBalance] = useState(null)

    const [balanceStake,setBalanceStake] = useState(null)

    const [usdValue,setUsdValue] = useState(null)

    const [fadeDown,setFadeDown] = useState(anFadeDown)

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
            // console.log(balance)
            setBalance(balance.data[adress]/1000000000000000000)
        }
        showBalance()

        const showBalanceStake = async () =>{
            const adress = localStorage.getItem('adress')
            const balance = JSON.parse(await window.walletAPI.stakedBalance(adress))
            console.log(balance.data[adress].substr(0, 17)/1000000000000000000)
            setBalanceStake(balance.data[adress].substr(0, 17)/1000000000000000000)
        }
        showBalanceStake()

        const showValuesADK = async () =>{
            const values = await window.walletAPI.getAdkPrices()
            setUsdValue(values.USD)
            // console.log(values.USD)
        }
        showValuesADK()

        if (props.path === '/wallet'){
            setBlueClass('')
        }else {
            setBlueClass('blue')
        }
    },[])

    return (
        <div className={`wallet-balance ${fadeDown}`}>

            <div className={`container-top-wallet`}>
                <div className={`bal-container ${checkLightTheme()}`}>
                    {
                        blueClass === 'blue'?
                            <img src="./images/wallet-page/logoKrugBlue.svg" alt=""/>:
                            <img src="./images/wallet-page/logoKrug.svg" alt=""/>
                    }
                    <img src="./images/wallet-page/lisa.svg" alt=""/>
                </div>
            </div>

            <div className={`balance ${checkLightTheme()}`}>
                {
                    blueClass === 'blue'?
                        <div className={'money-container'}>
                            <h1 className={blueClass}>{balanceStake}<span>ADK</span></h1>
                            <h2 className={blueClass}>{balanceStake * usdValue} $</h2>
                        </div>:
                        <div className={'money-container'}>
                            <h1 className={blueClass}>{balance}<span>ADK</span></h1>
                            <h2 className={blueClass}>{balance * usdValue} $</h2>
                        </div>
                }
                <div className={`butt-container-wallet ${checkLightTheme()}`}>
                    {
                        blueClass === 'blue'?
                            <>
                                <button className={`border-button ${blueClass}`} onClick={() => handleCloseWallet('/wallet/stake')}>Stake</button>
                                <button className={`border-button ${blueClass}`} onClick={() => handleCloseWallet('/wallet/unstake')}>Unstake</button>
                            </>:
                            <>
                                <button className={`border-button ${blueClass}`} onClick={() => handleCloseWallet('/wallet/send')}>Send</button>
                                <button className={`border-button ${blueClass}`} onClick={() => handleCloseWallet('/wallet/receive')}>Deposit</button>
                            </>
                    }
                </div>
            </div>
        </div>
    );
};

export default WalletBalance;