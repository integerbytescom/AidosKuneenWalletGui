import React,{useState} from 'react';
import './RecoverSeed.css';
import {useNavigate} from "react-router-dom";
import {anFade, anFadeLeft, anFadeLeftOut, anFadeOut} from "../../animations";

const RecoverSeed = () => {

    const navigate = useNavigate()

    const [fade,setFade] = useState(anFade)
    const [fadeLeft,setFadeLeft] = useState(anFadeLeft)

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
        <div className={`recover-seed`}>
            <div className={`block-container`}>
                <button onClick={event => handleRecoverSeed('/auth',event)} className={`close-button ${fade}`}>
                    <img src="./images/x.svg" alt=""/>
                </button>

                <div className={`form-pass-container ${fadeLeft}`}>
                    <h2>Recover from seed</h2>
                    <form className="form-create-pass">
                        <div className="container-cp-inp">
                            <input type="password" placeholder={`enter 12/24 mnemonic seed words `} />
                        </div>

                        <button className={'dark'} onClick={event => handleRecoverSeed('/createPass',event)}>
                            Enter seed words
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RecoverSeed;