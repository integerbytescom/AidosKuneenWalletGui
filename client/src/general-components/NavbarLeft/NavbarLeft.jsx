import React, {useState} from 'react';
import './NavbarLeft.css';
import {Link, useLocation} from 'react-router-dom';
import {anFade, anFadeLeft2s} from "../../animations";

const NavbarLeft = () => {

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
                {path === '/wallet'?
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
                    <Link to={`/auth`}><img src="./images/navbar-left/credit-card.svg" alt=""/> Wallet</Link>
                    <Link to={`/auth`}><img src="./images/navbar-left/database.svg" alt=""/> Portfolio</Link>
                    <Link to={`/auth`}><img src="./images/navbar-left/edit-3.svg" alt=""/> About us</Link>
                    <Link to={`/auth`}><img src="./images/navbar-left/book.svg" alt=""/> F.A.Q.</Link>
                </div>
            </header>

            <footer>
                <Link to={`/auth`}><img src="./images/navbar-left/settings.svg" alt=""/> Settings</Link>

                {/*wallet page check*/}
                {path === '/wallet'?
                    <div className={`logout-but-cont ${fade}`}>
                        <hr/>
                        <Link to={`/auth`}> <img src="./images/navbar-left/log-out.svg" alt=""/> Log out</Link>
                    </div> :''
                }
            </footer>
        </nav>
    );
};

export default NavbarLeft;