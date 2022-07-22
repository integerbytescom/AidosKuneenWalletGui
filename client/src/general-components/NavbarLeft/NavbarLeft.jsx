import React from 'react';
import './NavbarLeft.css';
import {Link} from 'react-router-dom';
import {anFadeLeft2s} from "../../animations";

const NavbarLeft = () => {
    return (
        <nav className={`navbar-left ${anFadeLeft2s}`}>
            <header>
                <div className="logo">
                    <img className={'ai-logo'} src="./images/navbar-left/logo.svg" alt=""/>
                    <img className={'ak-logo'} src="./images/navbar-left/ak.svg" alt=""/>
                </div>

                <div className="menu">
                    <Link to={`/auth`}><img src="./images/navbar-left/credit-card.svg" alt=""/> Wallet</Link>
                    <Link to={`/auth`}><img src="./images/navbar-left/database.svg" alt=""/> Portfolio</Link>
                    <Link to={`/auth`}><img src="./images/navbar-left/edit-3.svg" alt=""/> About us</Link>
                    <Link to={`/auth`}><img src="./images/navbar-left/book.svg" alt=""/> F.A.Q.</Link>
                </div>
            </header>

            <footer>
                <Link to={`/auth`}><img src="./images/navbar-left/settings.svg" alt=""/> Settings</Link>
            </footer>
        </nav>
    );
};

export default NavbarLeft;