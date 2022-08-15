import React, {useState} from 'react';
import './CreateWalletPage.css';
import {useNavigate} from 'react-router-dom';
import {anFadeLeft, anFadeLeftOut, anFadeOut, anFadeRight, anFadeSlow} from "../../animations";
import Errors from "../../general-components/Errors/Errors";
import {checkLightTheme} from "../../lightThemeCheck";

export let GLOBAL_PASS;
export let GLOBAL_ADRESS;
export let GLOBAL_SEED;
export let GLOBAL_USER = false;


const CreateWalletPage = () => {

    const navigate = useNavigate()

    //animations
    const [fadeSlow,setFadeSlow] = useState(anFadeSlow)
    const [fadeLeft,setFadeLeft] = useState(anFadeRight)

    //passwords
    const [pass,setPass] = useState('')
    const [passCopy,setPassCopy] = useState('')

    //errors
    const [error,setError] = useState('')

    const handleRoute = async (url,event) =>{
        // window.walletAPI.createWalletNew()
        event.preventDefault()
        if (pass.length<8){
            setErrorFun('The password should consist of at least 8 characters.')
            setPass('')
            setPassCopy('')
        }else if (pass !== passCopy){
            setErrorFun('Passwords does not match. Please Try Again.')
            setPass('')
            setPassCopy('')
        }else {
            let dataUser = JSON.parse(await window.walletAPI.createWalletNew(pass));
            window.localStorage.setItem('password', pass);
            window.localStorage.setItem('adress', dataUser.data[0]);
            window.localStorage.setItem('seed', dataUser.data[1]);
            window.localStorage.setItem('user', true);
            GLOBAL_PASS = pass;
            GLOBAL_ADRESS = dataUser.data[0];
            GLOBAL_SEED = dataUser.data[1];
            GLOBAL_USER = true;
            setFadeSlow(anFadeOut)
            setFadeLeft(anFadeLeftOut)
            setTimeout(() => navigatePage(url),1000)
        }
        // setFadeSlow(anFadeOut)
        // setFadeLeft(anFadeLeftOut)
        // setTimeout(() => navigatePage(url),1000)
    }

    const setErrorFun = (text) =>{
        setError(text)
        setTimeout(() => setError(''),3000)
    }

    const [passShow,setPassShow] = useState(false)
    const handleShowPass = () =>{
        setPassShow(!passShow)
    }

    const navigatePage = (url) =>{
        navigate(url)
    }

    return (
            <div className={`block-container ${checkLightTheme()}`}>
                
                <button onClick={() => navigatePage('/')} className={`close-button ${fadeSlow} ${checkLightTheme()}`}>
                    Cancel
                </button>

                <div className={`dots-create ${fadeSlow}`}>
                    <div className="dot active"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>

                <div className={`form-create-wallet-container ${fadeLeft}`}>
                    <h2 className={`${checkLightTheme()}`}>Enter Password</h2>
                    <form>
                        <div className="pass-first">
                            <input
                                className={`input-gray ${checkLightTheme()}`}
                                type={passShow?'text':'password'}
                                placeholder={`password min .8 ch.`}
                                value={pass}
                                onChange={event => setPass(event.target.value)}
                            />
                            <div className={checkLightTheme()}>
                                <img
                                    onClick={handleShowPass}
                                    src={checkLightTheme()?"./images/eye-dark.svg":"./images/eye.svg"}
                                    alt="eye"
                                />
                            </div>
                        </div>

                        <input
                            className={`input-gray ${checkLightTheme()}`}
                            type="password"
                            placeholder={`Repeat your Password`}
                            value={passCopy}
                            onChange={event => setPassCopy(event.target.value)}
                        />

                        <button className={`blue-button`} onClick={(event) => handleRoute('/showSeed',event)}>Next</button>
                    </form>
                </div>

                {error===''?'':<Errors error={error} />}

            </div>
    );
};

export default CreateWalletPage;