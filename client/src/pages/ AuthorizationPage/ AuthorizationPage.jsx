import React,{useState} from 'react';
import './ AuthorizationPage.css';
import {anFade1s, anFadeSlow} from "../../animations";

const AuthorizationPage = () => {

    const [fadeSlow,setFadeSlow] = useState(anFadeSlow)
    const [fade1s,setFade1s] = useState(anFade1s)

    //кошелек
    //кнопки
    //меню

    return (
        <>
        <div className={`authorization-page`}>
            <div className={`block-container`}>

                <img className={`waves-auth ${fadeSlow}`} src="./images/auth-page/waves.svg" alt={``}/>

                <div className={`auth-content`}>
                    <img className={`card-auth ${fadeSlow}`} src="./images/auth-page/card2.png" alt={``}/>

                    <div className={`buttons-container ${fade1s}`}>
                        <button className={`blue`}>Create wallet</button>
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