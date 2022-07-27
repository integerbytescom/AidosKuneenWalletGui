import React, {useEffect, useState} from 'react';
import './WalletBalance.css';
import {anFade, anFade1s, anFadeOut} from "../../../../animations";
import {useNavigate} from "react-router-dom";

const WalletBalance = (props) => {

    const [blueClass,setBlueClass] = useState('')


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
        if (props.path === '/wallet'){
            setBlueClass('')
        }else {
            setBlueClass('blue')
        }
    })

    return (
        <>
            {
                blueClass === 'blue'?
                    <img className={`wal-waves-shd ${fade}`} src="./images/wallet-page/waves-shd-blue.svg" alt=""/>:
                    <img className={`wal-waves-shd ${blueClass} ${fade}`} src="./images/wallet-page/waves-shd.svg" alt=""/>
            }

            <div className={`container-top-wallet ${fade1s}`}>
                <div className="bal-container">
                    {
                        blueClass === 'blue'?
                            <img src="./images/wallet-page/logoKrugBlue.svg" alt=""/>:
                            <img src="./images/wallet-page/logoKrug.svg" alt=""/>
                    }
                    <h1 className={blueClass}>140,043.24 ADK</h1>
                    <h3 className={blueClass}>356 $</h3>
                </div>

                <div className="butt-container">
                    {
                        blueClass === 'blue'?
                            <>
                                <button className={blueClass} onClick={() => handleCloseWallet('/wallet/stake')}>Stake</button>
                                <button className={blueClass} onClick={() => handleCloseWallet('/wallet/unstake')}>Unstake</button>
                            </>:
                            <>
                                <button className={blueClass} onClick={() => handleCloseWallet('/wallet/send')}>Send</button>
                                <button className={blueClass} onClick={() => handleCloseWallet('/wallet/receive')}>Receive</button>
                            </>
                    }
                </div>
            </div>
        </>
    );
};

export default WalletBalance;