import React, {useState} from 'react';
import './NavbarLeft.css';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {anFade, anFadeLeft2s} from "../../animations";

const NavbarLeft = () => {

    const navigate = useNavigate();
    const path = useLocation().pathname;

    return (
        <>
        {path.startsWith('/wallet')?
        <nav className={`navbar-left ${anFadeLeft2s}`}>
            <header>
                <div className="logo">
                    <img className={'ai-logo'} src="./images/navbar-left/logo.svg" alt=""/>
                    <img className={'ak-logo'} src="./images/navbar-left/ak.svg" alt=""/>
                </div>


                <div className={`nav-bal-stack`}>
                    <div>
                        <p>Total balance</p>
                        <h5 className={`green`}>140,043.24</h5>
                    </div>
                    <hr/>
                    <div>
                        <p>Total staked</p>
                        <h5>15,425.64</h5>
                    </div>
                </div>


                <div className="menu">
                    <Link  to={`/wallet`} className={path==='/wallet' || path==='/wallet/send' || path==='/wallet/receive'?'active':''}>
                        <img src="./images/navbar-left/credit-card.svg" alt=""/>
                        Wallet
                    </Link>
                    <Link to={`/wallet/calc`} className={path==='/wallet/calc'?'active':''}>
                        <img src="./images/navbar-left/dollar-sign.svg" alt=""/>
                        Calculator
                    </Link>
                    <Link to={`/wallet/overview`} className={path==='/wallet/overview'?'active':''}>
                        <img src="./images/navbar-left/database.svg" alt=""/>
                        Overview
                    </Link>
                    <Link to={`/wallet/aboutUs`} className={path==='/wallet/aboutUs'?'active':''}>
                        <img src="./images/navbar-left/edit-3.svg" alt=""/>
                        About us
                    </Link>
                    <Link to={`/wallet/FAQ`} className={path==='/wallet/FAQ'?'active':''}>
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
                    <Link className={path==='/auth'?'active':''} to={`/auth`}>
                        <img src="./images/navbar-left/log-out.svg" alt=""/>
                        Log out
                    </Link>
                </div>
            </footer>

        </nav> :''}</>
    );
};

export default NavbarLeft;