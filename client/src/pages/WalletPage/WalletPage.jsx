import React, {useState} from 'react';
import './WalletPage.css';
import {anFade, anFade1s, anFadeOut} from "../../animations";
import LatestTransactions from "./components/LatestTransactions/LatestTransactions";
import {useNavigate} from "react-router-dom";

const WalletPage = () => {

    const [fadeExit,setFadeExit] = useState('')
    const [fade,setFade] = useState(anFade)
    const [fade1s,setFade1s] = useState(anFade1s)

    const navigate = useNavigate()

    const handleCloseWallet = (url) =>{
        setFadeExit(anFadeOut)
        setTimeout(() => navigateRoute(url),1000)
    }
    const navigateRoute = (url) =>{
        navigate(url)
    }

    return (
        <div className={`wallet-page ${fadeExit}`}>
            <div className={`block-container`}>
                <img className={`wal-waves-shd ${fade}`} src="./images/wallet-page/waves-shd.svg" alt=""/>

                <div className={`container-top-wallet ${fade1s}`}>
                    <div className="bal-container">
                        <img src="./images/wallet-page/logoKrug.svg" alt=""/>
                        <h1>140,043.24 ADK</h1>
                        <h3>356 $</h3>
                    </div>

                    <div className="butt-container">
                        <button onClick={() => handleCloseWallet('/wallet/send')}>Send</button>
                        <button onClick={() => handleCloseWallet('/wallet/receive')}>Receive</button>
                    </div>
                </div>

                <LatestTransactions />
            </div>
        </div>
    );
};

export default WalletPage;