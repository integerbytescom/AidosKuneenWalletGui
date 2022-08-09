import React, {useEffect, useState} from 'react';
import {anFade} from "../../animations";
import './Settings.css';
import SettingsModal from "./SettingsModal/SettingsModal";

const Settings = () => {

    const [fade,setFade] = useState(anFade)

    //state for modal
    const [setModal,setSetModal] = useState(false)

    //for message after set settings
    const [message] = useState('Перезагрузите приложение для того чтобы настройки вступили в силу')

    //for block display after 15 min
    const [secur,setSecur] = useState('')

    const handleChangeSecurity = (value) =>{
        window.localStorage.setItem('security',value)
        setSecur(window.localStorage.getItem('security'))
        setSetModal(true)
    }

    useEffect(() =>{
        setSecur(window.localStorage.getItem('security')==='true')
    },[])

    return (
        <div className={`block-container menu settings ${fade}`}>

            <SettingsModal mess={message} show={setModal} onHide={() =>setSetModal(false)} />

            <div className="container-setting">
                <img src="./images/settings/security.svg" alt=""/>
                <div className="content-settings">
                    <h3>Security</h3>
                    <span>
                        <input checked={secur} onChange={() => handleChangeSecurity(!secur)} type="checkbox"/>
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