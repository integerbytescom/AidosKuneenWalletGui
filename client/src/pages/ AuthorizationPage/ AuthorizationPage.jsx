import React,{useState} from 'react';
import './ AuthorizationPage.css';
import {anFade1s, anFadeOut, anFadeSlow} from "../../animations";
import {useNavigate} from "react-router-dom";

const AuthorizationPage = () => {

    const navigate = useNavigate()

    const [fadeSlow,setFadeSlow] = useState(anFadeSlow)
    const [fade1s,setFade1s] = useState(anFade1s)

    const handleCreate = () => {
        setFadeSlow(anFadeOut)
        setFade1s(anFadeOut)
        setTimeout(() => navigatePage('/createWallet'),1000)
    }

    const navigatePage = (url) => {
        navigate(url)
    }

    return (
        <>
        <div className={`authorization-page`}>
            <div className={`block-container`}>

                <img className={`waves-auth ${fadeSlow}`} src="./images/auth-page/waves.svg" alt={``}/>

                <div className={`auth-content`}>
                    <img className={`card-auth ${fadeSlow}`} src="./images/auth-page/card2.png" alt={``}/>

                    <div className={`buttons-container ${fade1s}`}>
                        <button className={`blue`} onClick={handleCreate}>Create wallet</button>
                        <button>Enter Seed</button>
                        <button>Connect MetaMask</button>
                    </div>

                </div>

            </div>
        </div>
        </>
    );
};

export default AuthorizationPage;