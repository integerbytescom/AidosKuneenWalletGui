import React, {useEffect, useState} from 'react';
import './WalletPage.css';
import LatestTransactions from "./components/LatestTransactions/LatestTransactions";
import WalletBalance from "./components/WalletBalance/WalletBalance";
import {Link, useLocation} from "react-router-dom";
import CalculatorPage from "../CalculatorPage/CalculatorPage";
import Overview from "./components/Overview/Overview";
import {anFade, anFade1s} from "../../animations";
import {checkLightTheme} from "../../lightThemeCheck";

const WalletPage = () => {

    const path = useLocation().pathname;
    const [fadeExit,setFadeExit] = useState('')
    const [blueClass,setBlueClass] = useState('')

    const [fade,setFade] = useState(anFade)

    useEffect(() =>{
        if (path === '/wallet/staking'){
            setBlueClass('blue')
        }else {
            setBlueClass('')
        }
    })

    return (
            <div className={`block-container ${fadeExit} ${checkLightTheme()}`}>
                {checkLightTheme()?
                    <img className={`fon-wallet-bal ${fade}`} src="./images/wallet-page/fon-wallet-bg.svg" alt=""/>:
                    <img className={`fon-wallet-bal ${fade}`} src="./images/wallet-page/waves-shd.svg" alt=""/>
                }
                <div className={`block-container menu`}>

                    <WalletBalance setFadeExit={setFadeExit} path={path} />

                    <div className={`body-wallet ${anFade1s}`}>
                        <Overview />
                        <CalculatorPage />
                    </div>

                    <LatestTransactions path={path} />
                </div>
            </div>
    );
};

export default WalletPage;