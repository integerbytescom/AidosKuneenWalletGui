import React,{useState} from 'react';
import WalletBalance from "../WalletBalance/WalletBalance";
import LatestTransactions from "../LatestTransactions/LatestTransactions";
import {useLocation} from "react-router-dom";

const Staking = () => {

    const [fadeExit,setFadeExit] = useState('')

    return (
        <div className={`wallet-page ${fadeExit}`}>
            <div className={`block-container`}>
                <WalletBalance setFadeExit={setFadeExit} />

                <LatestTransactions />
            </div>
        </div>
    );
};

export default Staking;