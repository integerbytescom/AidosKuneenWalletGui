import React, {useEffect, useState} from 'react';
import './ AuthorizationPage.css';
import {anFade, anFade1s, anFadeOut, anFadeSlow} from "../../animations";
import {useNavigate} from "react-router-dom";
import Errors from "../../general-components/Errors/Errors";

const AuthorizationPage = () => {

    const navigate = useNavigate()

    const [display,setDisplay] = useState('display')

    const [error,setError] = useState('')

    const [user] = useState(window.localStorage.getItem('user'))

    const [fadeSlow,setFadeSlow] = useState(anFadeSlow)
    const [fade1s,setFade1s] = useState(anFade1s)
    const [fadeVideo,setFadeVideo] = useState('')

    const [userPass,setUserPass] = useState('')

    const handleCreate = (url,e) => {
        e.preventDefault()
        if (userPass !== window.localStorage.getItem('password')){
            setErrorFun('Пароль не подходит')
            setUserPass('')
        }else {
            setFadeSlow(anFadeOut)
            setFade1s(anFadeOut)
            setTimeout(() => navigatePage(url),1000)
        }
    }

    const setErrorFun = (text) =>{
        setError(text)
        setTimeout(() => setError(''),3000)
    }

    const handleCreateNoPass = (url,e) => {
        e.preventDefault()
        setFadeSlow(anFadeOut)
        setFade1s(anFadeOut)
        setTimeout(() => navigatePage(url),1000)
    }

    const closeVideo = () =>{
        setDisplay('none')
        setFadeVideo(anFadeOut)
    }
    useEffect(() =>{
        window.sessionStorage.setItem('userVideo',true)
        setTimeout(() => setDisplay('none'),16800)
    })

    const navigatePage = (url) => {
        navigate(url)
    }

    return (
        <>
            {window.sessionStorage.getItem('userVideo')?'':
                <div onClick={closeVideo} style={{display:display}} className={`video-wrapper`}>
                    <video playsInline autoPlay muted loop>
                        <source
                            src="./videos/1.webm"
                            type="video/webm"
                        />
                    </video>
                </div>
            }

            <div style={{backgroundImage:`url('./images/auth-page/waves.svg')`}} className={`block-container bottom-waves ${fadeSlow}`}>

                {error===''?'':<Errors error={error} />}

                    {/*auth container start*/}
                <div className={`auth-content`}>
                    <div className="img-auth-container">
                        <img className={`card-auth ${fadeSlow}`} src="./images/auth-page/card2.png" alt={``}/>
                    </div>

                    <div className={`buttons-container ${fade1s}`}>
                        {user?
                            <>
                                <form className="form-create-pass">
                                    <input
                                        className={'input-gray'}
                                        type="password"
                                        placeholder={`enter password`}
                                        value={userPass}
                                        onChange={event => setUserPass(event.target.value)}
                                    />
                                    <button className={`blue-button`} onClick={event => handleCreate('/wallet',event)}>Login</button>
                                </form>
                                <div className={'hr-or'}>
                                    <hr/>
                                    <p>or</p>
                                    <hr/>
                                </div>
                                <button className={`gray-button`} onClick={event => handleCreateNoPass('/recoverSeed',event)}>Enter Seed</button>
                                <button className={`gray-button`} onClick={event => handleCreate('/connectMM/confirmPassword',event)}>Connect MetaMask</button>
                            </>
                            :
                            <>
                                <button className={`blue-button`} onClick={event => handleCreateNoPass('/createWallet',event)}>Create wallet</button>
                                <button className={`gray-button`} onClick={event => handleCreateNoPass('/recoverSeed',event)}>Enter Seed</button>
                                <button className={`gray-button`} onClick={event => handleCreate('/connectMM/confirmPassword',event)}>Connect MetaMask</button>
                            </>
                        }
                    </div>

                </div>
                    {/*auth container end*/}

            </div>
        </>
    );
};

export default AuthorizationPage;