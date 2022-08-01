import React, {useState} from 'react';
import './CreateWalletPage.css';
import {useNavigate} from 'react-router-dom';
import {anFadeLeft, anFadeLeftOut, anFadeOut, anFadeRight, anFadeSlow} from "../../animations";
import Errors from "../../general-components/Errors/Errors";

const CreateWalletPage = () => {

    const navigate = useNavigate()

    //animations
    const [fadeSlow,setFadeSlow] = useState(anFadeSlow)
    const [fadeLeft,setFadeLeft] = useState(anFadeRight)

    //passwords
    const [pass,setPass] = useState('')
    const [passCopy,setPassCopy] = useState('')

    //errors
    const [error,setError] = useState('no errors')


    const handleRoute = (url,event) =>{
        // window.walletAPI.createWalletNew()
        event.preventDefault()
        if (pass.length<8){
            setError('Длинна пароля должны быть не менее 8 символов')
            setPass('')
            setPassCopy('')
        }else if (pass !== passCopy){
            setError('Пароли не совпадают')
            setPass('')
            setPassCopy('')
        }else {
            window.walletAPI.createWalletNew(pass)
        }
        // setFadeSlow(anFadeOut)
        // setFadeLeft(anFadeLeftOut)
        // setTimeout(() => navigatePage(url),1000)
    }

    const [passShow,setPassShow] = useState(false)
    const handleShowPass = () =>{
        setPassShow(!passShow)
    }

    const navigatePage = (url) =>{
        navigate(url)
    }

    return (
            <div className={`block-container`}>
                
                <button onClick={event => handleRoute('/auth',event)} className={`close-button ${fadeSlow}`}>
                    <img src="./images/x.svg" alt=""/>
                </button>

                <div className={`dots-create ${fadeSlow}`}>
                    <div className="dot active"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>

                <div className={`form-create-wallet-container ${fadeLeft}`}>
                    <h2>Enter Password at least eight characters</h2>
                    <form>
                        <div className="pass-first">
                            <input
                                className={`input-gray`}
                                type={passShow?'text':'password'}
                                placeholder={`create password`}
                                value={pass}
                                onChange={event => setPass(event.target.value)}
                            />
                            <div><img onClick={handleShowPass} src="./images/eye.svg" alt=""/></div>
                        </div>

                        <input
                            className={`input-gray`}
                            type="password"
                            placeholder={`Repeat your Password`}
                            value={passCopy}
                            onChange={event => setPassCopy(event.target.value)}
                        />

                        <button className={`blue-button`} onClick={(event) => handleRoute('/showSeed',event)}>Next</button>
                    </form>
                </div>

                <Errors error={error} />

            </div>
    );
};

export default CreateWalletPage;