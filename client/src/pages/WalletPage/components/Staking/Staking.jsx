import React,{useState} from 'react';
import WalletBalance from "../WalletBalance/WalletBalance";
import LatestTransactions from "../LatestTransactions/LatestTransactions";
import {Link, useLocation} from "react-router-dom";
import './Staking.css';

const Staking = () => {

    const path = useLocation().pathname;
    const [fadeExit,setFadeExit] = useState('')

    return (
        <div className={`block-container ${fadeExit}`}>
            <div className={`block-container menu`}>

                <Link to={'/wallet'} className="border-button balance-show">Balance</Link>

                <WalletBalance setFadeExit={setFadeExit} path={path} />

                <LatestTransactions path={path} />
            </div>
        </div>
    );
};

export default Staking;