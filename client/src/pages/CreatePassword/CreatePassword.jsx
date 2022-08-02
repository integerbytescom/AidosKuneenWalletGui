import React,{useState} from 'react';
import './CreatePassword.css';
import {useNavigate} from "react-router-dom";
import {anFade, anFadeLeftOut, anFadeOut, anFadeRight, anFadeSlow} from "../../animations";
import Errors from "../../general-components/Errors/Errors";

const CreatePassword = () => {

    const navigate = useNavigate()

    const [fadeSlow,setFadeSlow] = useState(anFadeSlow)

    const [error,setError] = useState('');

    const [pass,setPass] = useState('');
    const [passCopy,setPassCopy] = useState('');

    const [fade,setFade] = useState(anFade);
    const [fadeLeft,setFadeLeft] = useState(anFadeRight);

    const handleCreatePass = async (url,event) =>{
        event.preventDefault()
        if (pass !== passCopy){
            setErrorFun('Пароли не совпадают')
        }else if(pass.length < 8){
            setErrorFun('Пароль должен быть не менее 8 символов')
        }else{
            const seed = window.localStorage.getItem('seedMnemonic')
            const recoverResp = JSON.parse(await window.walletAPI.createWalletFromMnemonic(`"${seed}"`,pass))
            if (recoverResp.ok === true){
                const adress = JSON.parse(await window.walletAPI.listWalletAddress(`"${seed}"`,1)).data[0]
                window.localStorage.setItem('adress',adress)
                window.localStorage.setItem('seed',seed)
                window.localStorage.setItem('password',pass)
                setFade(anFadeOut)
                setFadeSlow(anFadeOut)
                setFadeLeft(anFadeLeftOut)
                setTimeout(() => navigateRoute(url),1000)
            }else {
                setError('Проблемы с фразой')
            }
        }
    }

    const setErrorFun = (text) =>{
        setError(text)
        setTimeout(() => setError(''),3000)
    }

    const navigateRoute = (url) =>{
        navigate(url)
    }

    return (
            <div className={`block-container`}>

                {error!==''?<Errors error={error} />:''}

                <button onClick={() => navigateRoute('/auth')} className={`close-button ${fade}`}>
                    <img src="./images/x.svg" alt=""/>
                </button>

                <div className={`dots-create ${fadeSlow}`}>
                    <div className="dot active"></div>
                    <div className="dot active"></div>
                    <div className="dot"></div>
                </div>

                <div className={`create-pass-container ${fadeLeft}`}>
                    <h2>Create password</h2>
                    <form className="form-create-pass">
                        <input
                            className={`input-gray`}
                            type="password"
                            placeholder={`create password`}
                            value={pass}
                            onChange={event => setPass(event.target.value)}
                        />

                        <input
                            className={`input-gray`}
                            type="password"
                            placeholder={`insert again`}
                            value={passCopy}
                            onChange={event => setPassCopy(event.target.value)}
                        />

                        <button className={'blue-button'} onClick={event => handleCreatePass('/wallet',event)}>
                            Create
                        </button>
                    </form>
                </div>
            </div>
    );
};

export default CreatePassword;