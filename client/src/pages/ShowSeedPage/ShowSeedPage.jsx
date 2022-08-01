import React,{useState} from 'react';
import './ShowSeedPage.css';
import {anFadeLeftOut, anFadeOut, anFadeRight, anFadeSlow} from "../../animations";
import {useNavigate} from "react-router-dom";

const ShowSeedPage = () => {

    const navigate = useNavigate()

    const [fadeSlow,setFadeSlow] = useState(anFadeSlow)
    const [fadeLeft,setFadeLeft] = useState(anFadeRight)

    const handleSuccessSeed = (url) =>{
        setFadeSlow(anFadeOut)
        setFadeLeft(anFadeLeftOut)
        setTimeout(() => navigateRoute(url),1000)
    }

    const navigateRoute = (url) =>{
        navigate(url)
    }

    return (
            <div className={`block-container`}>

                <button onClick={event => handleSuccessSeed('/auth',event)} className={`close-button ${fadeSlow}`}>
                    <img src="./images/x.svg" alt=""/>
                </button>

                <div className={`dots-create ${fadeSlow}`}>
                    <div className="dot active"></div>
                    <div className="dot active"></div>
                    <div className="dot"></div>
                </div>

                <div className={`seed-first-show ${fadeLeft}`}>
                    <h2 className={`h2-seed`}>
                        Your Seed<br />
                        <span>Don't Share it with Anyone and Store it offline </span>
                    </h2>

                    <div className={`seed-container`}>
                        <header />
                        <div className="seed-text">
                            <p>patrol labor grant sadness legal sketch supreme symptom rebel setup trophy arrive</p>
                        </div>
                    </div>

                    <form className="form-create-pass">
                        <input className={`input-gray`} type="text" placeholder={`enter seed`} />
                        <br />
                        <button onClick={() => handleSuccessSeed('/confirmPass')} className={'gray-button'}>Finish</button>
                    </form>
                </div>

            </div>
    );
};

export default ShowSeedPage;