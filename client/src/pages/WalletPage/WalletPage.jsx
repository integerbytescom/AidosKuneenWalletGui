import React, {useState} from 'react';
import './WalletPage.css';
import {anFade, anFade1s, anFadeUp} from "../../animations";
import LatestTransactions from "./components/LatestTransactions/LatestTransactions";

const WalletPage = () => {

    const [fade,setFade] = useState(anFade)
    const [fade1s,setFade1s] = useState(anFade1s)

    return (
        <div className={`wallet-page`}>
            <div className={`block-container`}>
                <img className={`wal-waves-shd ${fade}`} src="./images/wallet-page/waves-shd.svg" alt=""/>

                <div className={`container-top-wallet ${fade1s}`}>
                    <div className="bal-container">
                        <img src="./images/wallet-page/logoKrug.svg" alt=""/>
                        <h1>140,043.24 ADK</h1>
                        <h3>356 $</h3>
                    </div>

                    <div className="butt-container">
                        <button>Send</button>
                        <button>Receive</button>
                    </div>
                </div>

                <LatestTransactions />
            </div>
        </div>
    );
};

export default WalletPage;