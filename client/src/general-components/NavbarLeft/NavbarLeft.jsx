import React, {useState} from 'react';
import './NavbarLeft.css';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {anFade, anFadeLeft2s} from "../../animations";

const NavbarLeft = () => {

    const navigate = useNavigate();
    const path = useLocation().pathname;

    const [fade,setFade] = useState(anFade)

    return (
        <nav className={`navbar-left ${anFadeLeft2s}`}>
            <header>
                <div className="logo">
                    <img className={'ai-logo'} src="./images/navbar-left/logo.svg" alt=""/>
                    <img className={'ak-logo'} src="./images/navbar-left/ak.svg" alt=""/>
                </div>

                {/*wallet page check*/}
                {path.startsWith('/wallet')?
                    <div className={`nav-bal-stack ${fade}`}>
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
                    :''}

                <div className="menu">
                    <Link  to={`/wallet`} className={path==='/wallet'?'active':''}>
                        <img src="./images/navbar-left/credit-card.svg" alt=""/>
                        Wallet
                    </Link>
                    <Link to={`/wallet/staking`} className={path==='/wallet/staking'?'active':''}>
                        <img src="./images/navbar-left/briefcase.svg" alt=""/>
                        Staking
                    </Link>
                    <Link to={`/wallet/overview`} className={path==='/wallet/overview'?'active':''}>
                        <img src="./images/navbar-left/database.svg" alt=""/>
                        Overview
                    </Link>
                    <Link to={`/wallet`} className={path==='/aboutUs'?'active':''}>
                        <img src="./images/navbar-left/edit-3.svg" alt=""/>
                        About us
                    </Link>
                    <Link to={`/wallet`} className={path==='/faq'?'active':''}>
                        <img src="./images/navbar-left/book.svg" alt=""/>
                        F.A.Q.
                    </Link>
                </div>
            </header>

            <footer>
                <Link className={path==='/settings'?'active':''} to={`/settings`}>
                    <img src="./images/navbar-left/settings.svg" alt=""/>
                    Settings
                </Link>

                {/*wallet page check*/}
                {path.startsWith('/wallet')?
                    <div className={`logout-but-cont ${fade}`}>
                        <hr/>
                        <Link className={path==='/auth'?'active':''} to={`/auth`}>
                            <img src="./images/navbar-left/log-out.svg" alt=""/>
                            Log out
                        </Link>
                    </div>:''
                }
            </footer>
        </nav>
    );
};

export default NavbarLeft;