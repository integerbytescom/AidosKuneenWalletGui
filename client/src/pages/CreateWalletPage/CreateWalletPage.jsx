import React, {useState} from 'react';
import './CreateWalletPage.css';
import {useNavigate} from 'react-router-dom';
import {anFadeLeft, anFadeLeftOut, anFadeOut, anFadeSlow} from "../../animations";

const CreateWalletPage = () => {

    const navigate = useNavigate()

    const [fadeSlow,setFadeSlow] = useState(anFadeSlow)
    const [fadeLeft,setFadeLeft] = useState(anFadeLeft)


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
        <div className={`create-wallet-page`}>
            <div className={`block-container`}>
                
                <button onClick={event => handleRoute('/auth',event)} className={`close-button ${fadeSlow}`}>
                    <img src="./images/x.svg" alt=""/>
                </button>

                <div className={`dots-create ${fadeSlow}`}>
                    <div className="dot active"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>

                <div className={`form-pass-container ${fadeLeft}`}>
                    <h2>Create password</h2>
                    <form className="form-create-pass">
                        <div className="container-cp-inp">
                            <input type="password" placeholder={`create password`} />
                        </div>
                        <div className="container-cp-inp">
                            <input type="password" placeholder={`insert again`} />
                        </div>

                        <button onClick={(event) => handleRoute('/showSeed',event)}>Create</button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default CreateWalletPage;