import React, {useEffect, useState} from 'react';
import './NavbarLeft.css';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {anFade, anFadeLeft, anFadeLeft2s} from "../../animations";
import {checkLightTheme} from "../../lightThemeCheck";

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
            setTotalBal('Load...')
            setTotalStake('Load...')
            const adress = localStorage.getItem('adress')
            const seed = localStorage.getItem('seed')
            const totalBalance = JSON.parse(await window.walletAPI.totalBalance(`"${seed}"`))
            const totalStacked = JSON.parse(await window.walletAPI.stakedBalance(adress))
            // console.log(totalBalance);
            // console.log(totalStacked);
            setTotalBal(totalBalance.data/1000000000000000000)
            setTotalStake(totalStacked.data[adress].substr(0, 17)/1000000000000000000)
        }
        getTotalBalance()
    },[])

    return (
        <>
        {path.startsWith('/wallet')?
        <nav className={`navbar-left ${anFadeLeft} ${checkLightTheme()}`}>
            <header>
                <div className="logo">
                    <img width={30} className={'ai-logo'} src="./images/navbar-left/logo.svg" alt=""/>
                    <p>Aidos Kuneen</p>
                </div>


                <div className={`nav-bal-stack ${checkLightTheme()}`}>
                    <div>
                        <p>Total balance</p>
                        <h5 className={`green`}>{totalBal?totalBal:0}</h5>
                    </div>
                    <hr className={checkLightTheme()}/>
                    <div>
                        <p>Total staked</p>
                        <h5>{totalStake?totalStake:0}</h5>
                    </div>
                </div>


                <div className="menu">
                    <Link  to={`/wallet`} className={path==='/wallet' || path==='/wallet/send' || path==='/wallet/receive'?'active':''}>
                        {checkLightTheme()?
                            <img src="./images/navbar-left/black-icons/credit-card.svg" alt=""/>:
                            <img src="./images/navbar-left/credit-card.svg" alt=""/>
                        }
                        Wallet
                    </Link>
                    <Link  to={`/wallet/staking`} className={path==='/wallet/staking' || path==='/wallet/stake' || path==='/wallet/unstake' ?'active':''}>
                        {checkLightTheme()?
                            <img src="./images/navbar-left/black-icons/briefcase.svg" alt=""/>:
                            <img src="./images/navbar-left/briefcase.svg" alt=""/>
                        }
                        Staking
                    </Link>
                    <Link to={`/wallet/aboutUs`} className={path==='/wallet/aboutUs' || path==='/wallet/fileForm'?'active':''}>
                        {checkLightTheme()?
                            <img src="./images/navbar-left/black-icons/edit-3.svg" alt=""/>:
                            <img src="./images/navbar-left/edit-3.svg" alt=""/>
                        }
                        About us
                    </Link>
                    <Link to={`/wallet/FAQ`} className={path==='/wallet/FAQ' || path==='/wallet/form'?'active':''}>
                        {checkLightTheme()?
                            <img src="./images/navbar-left/black-icons/support.svg" alt=""/>:
                            <img src="./images/navbar-left/support.svg" alt=""/>
                        }
                        Support
                    </Link>
                </div>
            </header>

            <footer>
                <Link className={path==='/wallet/settings'?'active':''} to={`/wallet/settings`}>
                    {checkLightTheme()?
                        <img src="./images/navbar-left/black-icons/settings.svg" alt=""/>:
                        <img src="./images/navbar-left/settings.svg" alt=""/>
                    }
                    Settings
                </Link>


                <div className={`logout-but-cont`}>
                    <hr className={checkLightTheme()}/>
                    <Link className={path==='/'?'active':''} to={`/`}>
                        {checkLightTheme()?
                            <img src="./images/navbar-left/black-icons/log-out.svg" alt=""/>:
                            <img src="./images/navbar-left/log-out.svg" alt=""/>
                        }
                        Log out
                    </Link>
                </div>
            </footer>

        </nav> :''}</>
    );
};

export default NavbarLeft;