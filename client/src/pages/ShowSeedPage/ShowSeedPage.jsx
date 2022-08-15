import React,{useState} from 'react';
import './ShowSeedPage.css';
import {anFadeLeftOut, anFadeOut, anFadeRight, anFadeSlow} from "../../animations";
import {useNavigate} from "react-router-dom";
import {GLOBAL_SEED} from "../CreateWalletPage/CreateWalletPage";
import Errors from "../../general-components/Errors/Errors";
import {checkLightTheme} from "../../lightThemeCheck";

const ShowSeedPage = () => {

    const navigate = useNavigate()

    const [error,setError] = useState('')

    const [fadeSlow,setFadeSlow] = useState(anFadeSlow)
    const [fadeLeft,setFadeLeft] = useState(anFadeRight)

    const [seedInp,setSeedInp] = useState('')
    const [seedInpCopy,setSeedInpCopy] = useState('')

    const handleSuccessSeed = (event,url) =>{
        event.preventDefault()
        if (seedInp !== GLOBAL_SEED){
            setErrorFun('SEED incorrect. Please try again.')
        }else if(seedInp !== seedInpCopy){
            setErrorFun('SEED does not match. Please Try Again.')
        }else{
            setFadeSlow(anFadeOut)
            setFadeLeft(anFadeLeftOut)
            setTimeout(() => navigateRoute(url),1000)
        }
    }

    const setErrorFun = (text) =>{
        setError(text)
        setTimeout(() => setError(''),3000)
    }

    const navigateRoute = (url) =>{
        navigate(url)
    }

    return (
            <div className={`block-container ${checkLightTheme()}`}>

                {error!==''?<Errors error={error} />:''}

                <button onClick={() => navigateRoute('/')} className={`close-button ${fadeSlow} ${checkLightTheme()}`}>
                    Cancel
                </button>

                <div className={`dots-create ${fadeSlow}`}>
                    <div className="dot active"></div>
                    <div className="dot active"></div>
                    <div className="dot"></div>
                </div>

                <div className={`seed-first-show ${fadeLeft}`}>
                    <h2 className={`h2-seed ${checkLightTheme()}`}>
                        Your Seed<br />
                        <span>Don't Share it with Anyone and Store it offline </span>
                    </h2>

                    <div className={`seed-container`}>
                        <header />
                        <div className="seed-text">
                            <p>{window.localStorage.getItem('seed')}</p>
                        </div>
                    </div>

                    <form className="form-create-pass">
                        <textarea
                            rows="2"
                            style={{resize: 'none'}}
                            className={`input-gray ${checkLightTheme()}`}
                            placeholder={`enter seed`}
                            value={seedInp}
                            onChange={event => setSeedInp(event.target.value)}
                        />
                        <textarea
                            rows="2"
                            style={{resize: 'none'}}
                            className={`input-gray ${checkLightTheme()}`}
                            placeholder={`enter seed`}
                            value={seedInpCopy}
                            onChange={event => setSeedInpCopy(event.target.value)}
                        />
                        <br />
                        <button
                            onClick={event => handleSuccessSeed(event,'/confirmPass')}
                            className={`gray-button ${checkLightTheme()}`}
                        >Finish</button>
                    </form>
                </div>

            </div>
    );
};

export default ShowSeedPage;