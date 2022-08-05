import React, {useEffect, useState} from 'react';
import './NavbarLeft.css';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {anFade, anFadeLeft, anFadeLeft2s} from "../../animations";

const NavbarLeft = () => {

    const navigate = useNavigate();
    const path = useLocation().pathname;

    const [totalBal,setTotalBal] = useState(null)
    const [totalStake,setTotalStake] = useState(null)

    useEffect(() =>{
        const getTotalBalance = async () =>{
            // const seed = `"${localStorage.getItem('seed')}"`
            // const totalBalance = await JSON.parse(await window.walletAPI.totalBalance(seed));
            // const totalStake = await JSON.parse(await window.walletAPI.totaStake(seed));
            // console.log(totalBalance)
            // console.log(totalStake)
            // setTotalBal(totalBalance.data)
            // setTotalStake(totalStake.data)
            const adress = localStorage.getItem('adress')
            const totalBalance = JSON.parse(await window.walletAPI.balance(adress))
            const totalStacked = JSON.parse(await window.walletAPI.stakedBalance(adress))
            // console.log(totalBalance);
            // console.log(totalStacked);
            setTotalBal(totalBalance.data[adress]/1000000000000000000)
            setTotalStake(totalStacked.data[adress][0])
        }
        getTotalBalance()
    },[])

    return (
        <>
        {path.startsWith('/wallet')?
        <nav className={`navbar-left ${anFadeLeft}`}>
            <header>
                <div className="logo">
                    <img width={30} className={'ai-logo'} src="./images/navbar-left/logo.svg" alt=""/>
                    <p>Aidos Kuneen</p>
                </div>


                <div className={`nav-bal-stack`}>
                    <div>
                        <p>Total balance</p>
                        <h5 className={`green`}>{totalBal?totalBal:0}</h5>
                    </div>
                    <hr/>
                    <div>
                        <p>Total staked</p>
                        <h5>{totalStake?totalStake:0}</h5>
                    </div>
                </div>


                <div className="menu">
                    <Link  to={`/wallet`} className={path==='/wallet' || path==='/wallet/send' || path==='/wallet/receive'?'active':''}>
                        <img src="./images/navbar-left/credit-card.svg" alt=""/>
                        Wallet
                    </Link>
                    <Link  to={`/wallet/staking`} className={path==='/wallet/staking' || path==='/wallet/stake' || path==='/wallet/unstake' ?'active':''}>
                        <img src="./images/navbar-left/briefcase.svg" alt=""/>
                        Staking
                    </Link>
                    <Link to={`/wallet/aboutUs`} className={path==='/wallet/aboutUs' || path==='/wallet/fileForm'?'active':''}>
                        <img src="./images/navbar-left/edit-3.svg" alt=""/>
                        About us
                    </Link>
                    <Link to={`/wallet/FAQ`} className={path==='/wallet/FAQ' || path==='/wallet/form'?'active':''}>
                        <img src="./images/navbar-left/support.svg" alt=""/>
                        Support
                    </Link>
                </div>
            </header>

            <footer>
                <Link className={path==='/wallet/settings'?'active':''} to={`/wallet/settings`}>
                    <img src="./images/navbar-left/settings.svg" alt=""/>
                    Settings
                </Link>


                <div className={`logout-but-cont`}>
                    <hr/>
                    <Link className={path==='/'?'active':''} to={`/`}>
                        <img src="./images/navbar-left/log-out.svg" alt=""/>
                        Log out
                    </Link>
                </div>
            </footer>

        </nav> :''}</>
    );
};

export default NavbarLeft;