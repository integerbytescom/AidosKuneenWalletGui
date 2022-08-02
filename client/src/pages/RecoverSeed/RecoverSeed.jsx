import React,{useState} from 'react';
import './RecoverSeed.css';
import {useNavigate} from "react-router-dom";
import {anFade, anFadeLeftOut, anFadeOut, anFadeRight} from "../../animations";

const RecoverSeed = () => {

    const navigate = useNavigate()

    const [fade,setFade] = useState(anFade)
    const [fadeLeft,setFadeLeft] = useState(anFadeRight)

    const [seedInp,setSeedInp] = useState('')

    const handleRecoverSeed = (url,event) =>{
        window.localStorage.setItem('seedMnemonic',seedInp)
        event.preventDefault()
        setFade(anFadeOut)
        setFadeLeft(anFadeLeftOut)
        setTimeout(() => navigateRoute(url),1000)
    }

    const navigateRoute = (url) =>{
        navigate(url)
    }

    return (
            <div className={`block-container`}>
                <button onClick={() => navigateRoute('/auth')} className={`close-button ${fade}`}>
                    <img src="./images/x.svg" alt=""/>
                </button>

                <div className={`dots-create ${fade}`}>
                    <div className="dot active"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>

                <div className={`rec-seed-form-container ${fadeLeft}`}>
                    <h2>Recover from seed</h2>
                    <form>
                        <input
                            className={`input-gray`}
                            type="text"
                            placeholder={`enter 12/24 mnemonic seed words `}
                            value={seedInp}
                            onChange={event => setSeedInp(event.target.value)}
                        />

                        <button className={'blue-button'} onClick={event => handleRecoverSeed('/createPass',event)}>
                            Enter seed words
                        </button>
                    </form>
                </div>
            </div>
    );
};

export default RecoverSeed;