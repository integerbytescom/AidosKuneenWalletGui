import React,{useState} from 'react';
import './ AuthorizationPage.css';
import {anFadeSlow} from "../../animations";
import NavbarLeft from "../../general-components/NavbarLeft/NavbarLeft";

const AuthorizationPage = () => {

    const [fadeSlow,setFadeSlow] = useState(anFadeSlow)

    return (
        <>
        <NavbarLeft />
        <div className={`authorization-page`}>
            <div className={`block-container`}>

                <img className={`waves-auth ${fadeSlow}`} src="./images/auth-page/waves.svg" alt={``}/>

                <div className={`auth-content`}>
                    <img className={`card-auth ${fadeSlow}`} src="./images/auth-page/card2.png" alt={``}/>

                    <div className="buttons-container">
                        <button className={`blue ${fadeSlow}`}>Create wallet</button>
                        <button className={`${fadeSlow}`}>Enter Seed</button>
                        <button className={`${fadeSlow}`}>Connect MetaMask</button>
                    </div>

                </div>

            </div>
        </div>
        </>
    );
};

export default AuthorizationPage;