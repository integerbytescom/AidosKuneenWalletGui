import React,{useState} from 'react';
import './ AuthorizationPage.css';
import {anFade1s, anFadeOut, anFadeSlow} from "../../animations";
import {useNavigate} from "react-router-dom";

const AuthorizationPage = () => {

    const navigate = useNavigate()

    const [user] = useState(false)

    const [fadeSlow,setFadeSlow] = useState(anFadeSlow)
    const [fade1s,setFade1s] = useState(anFade1s)

    const handleCreate = (url,e) => {
        e.preventDefault()
        setFadeSlow(anFadeOut)
        setFade1s(anFadeOut)
        setTimeout(() => navigatePage(url),1000)
    }

    const navigatePage = (url) => {
        navigate(url)
    }

    return (
            <div style={{backgroundImage:`url('./images/auth-page/waves.svg')`}} className={`block-container bottom-waves`}>
                <div className={`block-container menu`}>

                    {/*auth container start*/}
                <div className={`auth-content`}>
                    <img className={`card-auth ${fadeSlow}`} src="./images/auth-page/card2.png" alt={``}/>

                    <div className={`buttons-container ${fade1s}`}>
                        {user?
                            <>
                                <form className="form-create-pass">
                                    <input className={'input-gray'} type="password" placeholder={`enter password`} />
                                    <button className={`blue-button`} onClick={event => handleCreate('/wallet',event)}>Login</button>
                                </form>
                                <div className={'hr-or'}>
                                    <hr/>
                                    <p>or</p>
                                    <hr/>
                                </div>
                                <button className={`gray-button`} onClick={event => handleCreate('/recoverSeed',event)}>Enter Seed</button>
                                <button className={`gray-button`} onClick={event => handleCreate('/connectMM/confirmPassword',event)}>Connect MetaMask</button>
                            </>
                            :
                            <>
                                <button className={`blue-button`} onClick={event => handleCreate('/createWallet',event)}>Create wallet</button>
                                <button className={`gray-button`} onClick={event => handleCreate('/recoverSeed',event)}>Enter Seed</button>
                                <button className={`gray-button`} onClick={event => handleCreate('/connectMM/confirmPassword',event)}>Connect MetaMask</button>
                            </>
                        }
                    </div>

                </div>
                    {/*auth container end*/}

                </div>
            </div>
    );
};

export default AuthorizationPage;