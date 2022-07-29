import React,{useState} from 'react';
import './ConfirmSeed.css';
import {useNavigate} from "react-router-dom";
import { anFadeLeftOut, anFadeOut, anFadeRight, anFadeSlow} from "../../animations";

const ConfirmSeed = () => {

    const navigate = useNavigate()

    const [fadeSlow,setFadeSlow] = useState(anFadeSlow)
    const [fadeLeft,setFadeLeft] = useState(anFadeRight)

    const handleConfirmSeed = (url,event) =>{
        event.preventDefault()
        setFadeSlow(anFadeOut)
        setFadeLeft(anFadeLeftOut)
        setTimeout(() => navigateRoute(url),1000)
    }

    const navigateRoute = (url) =>{
        navigate(url)
    }

    return (
            <div className={`block-container menu`}>

                <button onClick={event => handleConfirmSeed('/auth',event)} className={`close-button ${fadeSlow}`}>
                    <img src="./images/x.svg" alt=""/>
                </button>

                <div className={`dots-create ${fadeSlow}`}>
                    <div className="dot active"></div>
                    <div className="dot active"></div>
                    <div className="dot active"></div>
                    <div className="dot"></div>
                </div>

                <div className={`conf-seed-container ${fadeLeft}`}>
                    <h2>Enter your seed</h2>
                    <form className="form-create-pass">
                        <input className={`input-gray`} type="password" placeholder={`enter seed`} />
                        <br />
                        <button className={'gray-button'} onClick={event => handleConfirmSeed('/confirmPass',event)}>Continue</button>
                    </form>
                </div>

            </div>
    );
};

export default ConfirmSeed;