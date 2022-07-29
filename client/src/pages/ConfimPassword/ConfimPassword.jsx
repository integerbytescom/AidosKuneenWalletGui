import React,{useState} from 'react';
import {useNavigate} from "react-router-dom";
import { anFadeLeftOut, anFadeOut, anFadeRight, anFadeSlow} from "../../animations";
import './ConsfirmPassword.css';

const ConfirmPassword = (props) => {

    const navigate = useNavigate()

    const [fadeSlow,setFadeSlow] = useState(anFadeSlow)
    const [fadeLeft,setFadeLeft] = useState(anFadeRight)

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
            <div className={`block-container menu`}>

                <button onClick={event => handleConfirmPass('/auth',event)} className={`close-button ${fadeSlow}`}>
                    <img src="./images/x.svg" alt=""/>
                </button>

                {props.path === 'mm'?'':
                    <div className={`dots-create ${fadeSlow}`}>
                        <div className="dot active"></div>
                        <div className="dot active"></div>
                        <div className="dot active"></div>
                        <div className="dot active"></div>
                    </div>
                }

                <div className={`conf-pass-container ${fadeLeft}`}>
                    {
                        props.path === 'mm'?
                            <h2>MetaMask password</h2>:
                            <h2>Enter password</h2>
                    }
                    <form>
                        <input className={`input-gray`} type="password" placeholder={`enter password`} />

                        {
                            props.path === 'mm'?
                                <button className={'blue-button'} onClick={event => handleConfirmPass('/wallet',event)}>Enter</button>:
                                <button className={'gray-button'} onClick={event => handleConfirmPass('/wallet',event)}>Continue</button>
                        }
                    </form>
                </div>

            </div>
    );
};

export default ConfirmPassword;