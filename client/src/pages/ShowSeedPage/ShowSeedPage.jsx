import React,{useState} from 'react';
import './ShowSeedPage.css';
import {anFadeLeft, anFadeLeftOut, anFadeOut, anFadeSlow} from "../../animations";
import {useNavigate} from "react-router-dom";

const ShowSeedPage = () => {

    const navigate = useNavigate()

    const [fadeSlow,setFadeSlow] = useState(anFadeSlow)
    const [fadeLeft,setFadeLeft] = useState(anFadeLeft)

    const handleSuccessSeed = (url) =>{
        setFadeSlow(anFadeOut)
        setFadeLeft(anFadeLeftOut)
        setTimeout(() => navigateRoute(url),1000)
    }

    const navigateRoute = (url) =>{
        navigate(url)
    }

    return (
            <div className={`block-container menu`}>

                <button onClick={event => handleSuccessSeed('/auth',event)} className={`close-button ${fadeSlow}`}>
                    <img src="./images/x.svg" alt=""/>
                </button>

                <div className={`dots-create ${fadeSlow}`}>
                    <div className="dot active"></div>
                    <div className="dot active"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>

                <div className={`seed-first-show ${fadeLeft}`}>
                    <h2 className={`h2-seed`}>Your mnemonic seed<br />Don’t share it with anyone</h2>

                    <div className={`seed-container`}>
                        <header />
                        <div className="seed-text">
                            <p>patrol labor grant sadness legal sketch supreme symptom rebel setup trophy arrive</p>
                        </div>
                    </div>

                    <button
                        onClick={() => handleSuccessSeed('/confirmSeed')}
                        className={`gray-button`}
                    >I have stored this seed in a safe place</button>
                </div>

            </div>
    );
};

export default ShowSeedPage;