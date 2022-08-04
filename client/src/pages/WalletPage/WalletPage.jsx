import React, {useState} from 'react';
import './WalletPage.css';
import LatestTransactions from "./components/LatestTransactions/LatestTransactions";
import WalletBalance from "./components/WalletBalance/WalletBalance";
import {Link, useLocation} from "react-router-dom";
import CalculatorPage from "../CalculatorPage/CalculatorPage";
import Overview from "./components/Overview/Overview";

const WalletPage = () => {

    const path = useLocation().pathname;
    const [fadeExit,setFadeExit] = useState('')

    return (
            <div className={`block-container ${fadeExit}`}>
                <div className={`block-container menu`}>
                    <Link to={'/wallet/staking'} className="border-button stack-show">Staking</Link>


                    <WalletBalance setFadeExit={setFadeExit} path={path} />

                    <div className="body-wallet">
                        <Overview />
                        <CalculatorPage />
                    </div>

                    <LatestTransactions path={path} />
                </div>
            </div>
    );
};

export default WalletPage;