import React,{useState} from 'react';
import './ AuthorizationPage.css';
import {anFade1s, anFadeOut, anFadeSlow} from "../../animations";
import {useNavigate} from "react-router-dom";

const AuthorizationPage = () => {

    const navigate = useNavigate()

    const [user] = useState(true)

    const [fadeSlow,setFadeSlow] = useState(anFadeSlow)
    const [fade1s,setFade1s] = useState(anFade1s)

    const handleCreate = (url) => {
        setFadeSlow(anFadeOut)
        setFade1s(anFadeOut)
        setTimeout(() => navigatePage(url),1000)
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
                        {user?
                            <>
                                <form className="form-create-pass">
                                    <div className="container-cp-inp">
                                        <input type="password" placeholder={`enter password`} />
                                    </div>

                                    <button className={`blue`} onClick={() => handleCreate('/wallet')}>Login</button>
                                </form>
                                <div className={'hr-or'}>
                                    <hr/>
                                    <p>or</p>
                                    <hr/>
                                </div>
                                <button onClick={() => handleCreate('/recoverSeed')}>Enter Seed</button>
                                <button>Connect MetaMask</button>
                            </>:
                            <>
                                <button className={`blue`} onClick={() => handleCreate('/createWallet')}>Create wallet</button>
                                <button onClick={() => handleCreate('/recoverSeed')}>Enter Seed</button>
                                <button>Connect MetaMask</button>
                            </>
                        }
                    </div>

                </div>

            </div>
        </div>
        </>
    );
};

export default AuthorizationPage;