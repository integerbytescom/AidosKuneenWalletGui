import React, {useEffect, useState} from 'react';
import {anFade} from "../../animations";
import './Settings.css';
import SettingsModal from "./SettingsModal/SettingsModal";
import {checkLightTheme} from "../../lightThemeCheck";
import {bgImageCheck} from "../../bgImageCheck";

const Settings = () => {

    const [fade,setFade] = useState(anFade)

    //state for modal
    const [setModal,setSetModal] = useState(false)

    //for message after set settings
    const [message] = useState('Перезагрузите приложение для того чтобы настройки вступили в силу')
    //for block display after 15 min
    const [secur,setSecur] = useState('')
    //for background image
    const [bgImage,setBgImage] = useState(bgImageCheck())

    //for light theme
    const [lightTheme,setLightTheme] = useState(checkLightTheme())

    const handleChangeSecurity = (value) =>{
        window.localStorage.setItem('security',value)
        setSecur(window.localStorage.getItem('security'))
        setSetModal(true)
    }

    const handleChangeTheme = (value) =>{
        window.localStorage.setItem('lightTheme',value)
        setLightTheme(checkLightTheme())
        window.location.reload();
    }

    const handleChangeBgImage = (value) =>{
        window.localStorage.setItem('bgImage',value)
        setBgImage(bgImageCheck)
    }

    useEffect(() =>{
        setSecur(window.localStorage.getItem('security')==='true')
    },[])

    return (
        <div className={`block-container menu settings ${fade} ${checkLightTheme()}`}>

            <SettingsModal mess={message} show={setModal} onHide={() =>setSetModal(false)} />

            <div className={`container-setting ${checkLightTheme()}`}>
                <img src="./images/settings/security.svg" alt=""/>
                <div className="content-settings">
                    <h3>Security</h3>
                    <span>
                        <input checked={secur} onChange={() => handleChangeSecurity(!secur)} type="checkbox"/>
                        <p>Automatically block the screen after 15 minutes of inaction</p>
                    </span>
                </div>
            </div>

            <div className={`container-setting ${checkLightTheme()}`}>
                <img src="./images/settings/luna.svg" alt=""/>
                <div className="content-settings">
                    <h3>Light Mode</h3>
                    <span>
                        <input checked={lightTheme} onChange={() => handleChangeTheme(!lightTheme)} type="checkbox"/>
                        <p>Use light scheme</p>
                    </span>
                </div>
            </div>

            <div className={`container-setting ${checkLightTheme()}`}>
                <img src="./images/settings/chrome.svg" alt=""/>
                <div className="content-settings">
                    <h3>Hints</h3>
                    <span>
                        <input
                            type="checkbox"
                        />
                        <p>Show hints</p>
                    </span>
                </div>
            </div>

            <div className={`container-setting ${checkLightTheme()}`}>
                <img src="./images/settings/chrome.svg" alt=""/>
                <div className="content-settings select-image">
                    <h3>Select background image</h3>
                    <div>
                        <span>
                            <input checked={bgImage==='lines'} onChange={() => handleChangeBgImage('lines')} type="checkbox"/>
                            <p>Lines</p>
                        </span>
                        <span>
                            <input checked={bgImage==='gradient'} onChange={() => handleChangeBgImage('gradient')} type="checkbox"/>
                            <p>Gradient</p>
                        </span>
                        <span>
                            <input checked={bgImage==='honeycomb'} onChange={() => handleChangeBgImage('honeycomb')} type="checkbox"/>
                            <p>Honeycombs</p>
                        </span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Settings;