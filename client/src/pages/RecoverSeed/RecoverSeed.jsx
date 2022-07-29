import React,{useState} from 'react';
import './RecoverSeed.css';
import {useNavigate} from "react-router-dom";
import {anFade, anFadeLeftOut, anFadeOut, anFadeRight} from "../../animations";

const RecoverSeed = () => {

    const navigate = useNavigate()

    const [fade,setFade] = useState(anFade)
    const [fadeLeft,setFadeLeft] = useState(anFadeRight)

    const handleRecoverSeed = (url,event) =>{
        event.preventDefault()
        setFade(anFadeOut)
        setFadeLeft(anFadeLeftOut)
        setTimeout(() => navigateRoute(url),1000)
    }

    const navigateRoute = (url) =>{
        navigate(url)
    }

    return (
            <div className={`block-container menu`}>
                <button onClick={event => handleRecoverSeed('/auth',event)} className={`close-button ${fade}`}>
                    <img src="./images/x.svg" alt=""/>
                </button>

                <div className={`rec-seed-form-container ${fadeLeft}`}>
                    <h2>Recover from seed</h2>
                    <form>
                        <input className={`input-gray`} type="password" placeholder={`enter 12/24 mnemonic seed words `} />

                        <button className={'blue-button'} onClick={event => handleRecoverSeed('/createPass',event)}>
                            Enter seed words
                        </button>
                    </form>
                </div>
            </div>
    );
};

export default RecoverSeed;