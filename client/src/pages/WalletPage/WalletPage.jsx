import React, {useState} from 'react';
import './WalletPage.css';
import LatestTransactions from "./components/LatestTransactions/LatestTransactions";
import WalletBalance from "./components/WalletBalance/WalletBalance";
import {Link, useLocation} from "react-router-dom";

const WalletPage = () => {

    const path = useLocation().pathname;
    const [fadeExit,setFadeExit] = useState('')

    return (
            <div className={`block-container ${fadeExit}`}>
                <div className={`block-container menu`}>
                    <Link to={'/wallet/staking'} className="border-button stack-show">Staking</Link>

                    <WalletBalance setFadeExit={setFadeExit} path={path} />

                    <LatestTransactions path={path} />
                </div>
            </div>
    );
};

export default WalletPage;