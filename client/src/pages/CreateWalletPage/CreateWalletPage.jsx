import React, {useState} from 'react';
import './CreateWalletPage.css';
import {useNavigate} from 'react-router-dom';
import {anFadeLeft, anFadeLeftOut, anFadeOut, anFadeRight, anFadeSlow} from "../../animations";

const CreateWalletPage = () => {

    const navigate = useNavigate()

    const [fadeSlow,setFadeSlow] = useState(anFadeSlow)
    const [fadeLeft,setFadeLeft] = useState(anFadeRight)


    const handleRoute = (url,event) =>{
        event.preventDefault()
        setFadeSlow(anFadeOut)
        setFadeLeft(anFadeLeftOut)
        setTimeout(() => navigatePage(url),1000)
    }

    const navigatePage = (url) =>{
        navigate(url)
    }

    return (
            <div className={`block-container menu`}>
                
                <button onClick={event => handleRoute('/auth',event)} className={`close-button ${fadeSlow}`}>
                    <img src="./images/x.svg" alt=""/>
                </button>

                <div className={`dots-create ${fadeSlow}`}>
                    <div className="dot active"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>

                <div className={`form-create-wallet-container ${fadeLeft}`}>
                    <h2>Create password</h2>
                    <form>
                        <input className={`input-gray`} type="password" placeholder={`create password`} />
                        <input className={`input-gray`} type="password" placeholder={`insert again`} />

                        <button className={`blue-button`} onClick={(event) => handleRoute('/showSeed',event)}>Create</button>
                    </form>
                </div>

            </div>
    );
};

export default CreateWalletPage;