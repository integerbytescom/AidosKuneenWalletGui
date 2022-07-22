import React,{useState} from 'react';
import {useNavigate} from "react-router-dom";
import {anFadeLeft, anFadeLeftOut, anFadeOut, anFadeSlow} from "../../animations";

const ConfirmPassword = () => {

    const navigate = useNavigate()

    const [fadeSlow,setFadeSlow] = useState(anFadeSlow)
    const [fadeLeft,setFadeLeft] = useState(anFadeLeft)

    const handleConfirmPass = (url,event) =>{
        event.preventDefault()
        setFadeSlow(anFadeOut)
        setFadeLeft(anFadeLeftOut)
        setTimeout(() => navigateRoute(url),1000)
    }

    const navigateRoute = (url) =>{
        navigate(url)
    }

    return (
        <div className={`confirm-password-page`}>
            <div className={`block-container`}>

                <button onClick={event => handleConfirmPass('/auth',event)} className={`close-button ${fadeSlow}`}>
                    <img src="./images/x.svg" alt=""/>
                </button>

                <div className={`dots-create ${fadeSlow}`}>
                    <div className="dot active"></div>
                    <div className="dot active"></div>
                    <div className="dot active"></div>
                    <div className="dot active"></div>
                </div>

                <div className={`form-pass-container ${fadeLeft}`}>
                    <h2>Enter password</h2>
                    <form className="form-create-pass">
                        <div className="container-cp-inp">
                            <input type="password" placeholder={`enter password`} />
                        </div>

                        <button className={'dark'} onClick={event => handleConfirmPass('/wallet',event)}>Continue</button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default ConfirmPassword;