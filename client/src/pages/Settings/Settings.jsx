import React, {useState} from 'react';
import {anFade} from "../../animations";
import './Settings.css';

const Settings = () => {

    const [fade,setFade] = useState(anFade)

    return (
        <div className={`block-container menu settings ${fade}`}>
            <div className="container-setting">
                <img src="./images/settings/security.svg" alt=""/>
                <div className="content-settings">
                    <h3>Security</h3>
                    <span>
                        <input checked type="checkbox"/>
                        <p>Automatically block the screen after 15 minutes of inaction</p>
                    </span>
                </div>
            </div>

            <div className="container-setting">
                <img src="./images/settings/luna.svg" alt=""/>
                <div className="content-settings">
                    <h3>Night Mode</h3>
                    <span>
                        <input checked type="checkbox"/>
                        <p>Использовать темную схему</p>
                    </span>
                </div>
            </div>

            <div className="container-setting">
                <img src="./images/settings/chrome.svg" alt=""/>
                <div className="content-settings">
                    <h3>Анимация</h3>
                    <span>
                        <input type="checkbox"/>
                        <p>Показывать анимацию</p>
                    </span>
                </div>
            </div>

        </div>
    );
};

export default Settings;