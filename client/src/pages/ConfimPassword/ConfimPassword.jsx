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
            <div className={`block-container`}>

                <button onClick={() => navigateRoute('/')} className={`close-button ${fadeSlow}`}>
                    Cancel
                </button>

                {props.path === 'mm'?'':
                    <div className={`dots-create ${fadeSlow}`}>
                        <div className="dot active"></div>
                        <div className="dot active"></div>
                        <div className="dot active"></div>
                    </div>
                }

                <div className={`conf-pass-container ${fadeLeft}`}>
                    {
                        props.path === 'mm'?
                            <h2 className={'left'}>MetaMask password</h2>:
                            <>
                                <h2>Congratulations!</h2>
                                <p>Your wallet has been successfully created!</p>
                            </>
                    }
                    <form>
                        {
                            props.path === 'mm'?
                                <>
                                <input className={`input-gray`} type="password" placeholder={`enter password`} />
                                <button className={'blue-button left'} onClick={event => handleConfirmPass('/wallet',event)}>Enter</button>
                                </>:
                                <button className={`blue-button`} onClick={event => handleConfirmPass('/',event)} >
                                    Start <img src="./images/preview-page/arrow.svg" alt="arrow"/>
                                </button>
                        }
                    </form>
                </div>

            </div>
    );
};

export default ConfirmPassword;