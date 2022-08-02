import React,{useState} from 'react';
import './ShowSeedPage.css';
import {anFadeLeftOut, anFadeOut, anFadeRight, anFadeSlow} from "../../animations";
import {useNavigate} from "react-router-dom";
import {GLOBAL_SEED} from "../CreateWalletPage/CreateWalletPage";
import Errors from "../../general-components/Errors/Errors";

const ShowSeedPage = () => {

    const navigate = useNavigate()

    const [error,setError] = useState('no errors')

    const [fadeSlow,setFadeSlow] = useState(anFadeSlow)
    const [fadeLeft,setFadeLeft] = useState(anFadeRight)

    const [seedInp,setSeedInp] = useState('')

    const handleSuccessSeed = (event,url) =>{
        event.preventDefault()
        if (seedInp !== GLOBAL_SEED){
            setError('SEED не совпадает')
        }else{
            setFadeSlow(anFadeOut)
            setFadeLeft(anFadeLeftOut)
            setTimeout(() => navigateRoute(url),1000)
        }
    }

    const navigateRoute = (url) =>{
        navigate(url)
    }

    return (
            <div className={`block-container`}>
                <Errors error={error} />

                <button onClick={event => handleSuccessSeed(event,'/auth')} className={`close-button ${fadeSlow}`}>
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
                            <p>{window.localStorage.getItem('seed')}</p>
                        </div>
                    </div>

                    <form className="form-create-pass">
                        <input
                            className={`input-gray`}
                            type="text"
                            placeholder={`enter seed`}
                            value={seedInp}
                            onChange={event => setSeedInp(event.target.value)}
                        />
                        <br />
                        <button onClick={event => handleSuccessSeed(event,'/confirmPass')} className={'gray-button'}>Finish</button>
                    </form>
                </div>

            </div>
    );
};

export default ShowSeedPage;