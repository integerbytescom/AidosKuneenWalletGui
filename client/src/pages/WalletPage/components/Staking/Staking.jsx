import React,{useState} from 'react';
import WalletBalance from "../WalletBalance/WalletBalance";
import LatestTransactions from "../LatestTransactions/LatestTransactions";
import {useLocation} from "react-router-dom";

const Staking = () => {

    const path = useLocation().pathname;
    const [fadeExit,setFadeExit] = useState('')

    return (
        <div className={`wallet-page ${fadeExit}`}>
            <div className={`block-container`}>
                <WalletBalance setFadeExit={setFadeExit} path={path} />

                <LatestTransactions path={path} />
            </div>
        </div>
    );
};

export default Staking;