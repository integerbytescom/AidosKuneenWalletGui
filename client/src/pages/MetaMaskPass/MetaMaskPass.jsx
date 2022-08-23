import React,{useState} from 'react';
import {checkLightTheme} from "../../lightThemeCheck";
import Errors from "../../general-components/Errors/Errors";
import {anFade, anFadeRight} from "../../animations";
import {useNavigate} from "react-router-dom";
import {getBalance} from "../../getBalance";

const MetaMaskPass = () => {

    const navigate = useNavigate()

    //errors
    const [error,setError] = useState('');
    const [invalidInp,setInvalidInp] = useState('')

    //anim
    const [fade,setFade] = useState(anFade);
    const [fadeLeft,setFadeLeft] = useState(anFadeRight);

    //pass input
    const [pass,setPass] = useState('');

    //pass show funs
    const [passShow,setPassShow] = useState(false)
    const handleShowPass = () =>{
        setPassShow(!passShow)
    }

    const handleCheckMM = async (url,e) =>{
        e.preventDefault()
        if (!pass){
            setInvalidInp('invalid')
            setErrorFun('Enter your MetaMask password')
            return 0
        }else {
            let data = JSON.parse(await window.walletAPI.loadMetamaskMnemonics(`"${pass}"`))
            console.log(data)
            if (data.ok){
                const adr = Object.keys(data.data)[0]
                const seed = Object.values(data.data)[0]
                window.localStorage.setItem('adress',adr)
                window.localStorage.setItem('seed',seed)
                window.localStorage.setItem('password',pass)
                await getBalance()
                navigateRoute('/wallet')
            }else {
                setErrorFun('Incorrect MetaMask password')
            }
        }
    }

    //set error
    const setErrorFun = (text) =>{
        setError(text)
        setTimeout(() => setError(''),4000)
    }

    //navigate fun
    const navigateRoute = (url) =>{
        navigate(url)
    }

    return (
        <div className={`block-container ${checkLightTheme()}`}>

            {error!==''?<Errors error={error} />:''}

            <div className={`form-create-wallet-container ${fadeLeft}`}>
                <h2 className={checkLightTheme()}>Create password</h2>
                <form>

                    <div className="pass-auth">
                        <input
                            className={`input-gray ${checkLightTheme()} ${invalidInp} ${passShow?'act':''}`}
                            type={passShow?'text':'password'}
                            placeholder={`password min .8 ch.`}
                            value={pass}
                            onChange={event => setPass(event.target.value)}
                        />
                        <div className={`${checkLightTheme()} ${invalidInp}`}>
                            {
                                checkLightTheme()?
                                    <img onClick={handleShowPass} className={passShow?'act':''} src="./images/eye-dark.svg" alt=""/>:
                                    <img onClick={handleShowPass} className={passShow?'act':''} src="./images/eye.svg" alt=""/>
                            }
                        </div>
                    </div>

                    <footer>
                        <button className={'blue-button'} onClick={event => handleCheckMM('/localWalletSuccess',event)}>
                            Continue
                        </button>
                        <button className={`gray-button ${checkLightTheme()}`} onClick={() => navigateRoute('/')}>
                            Cancel
                        </button>
                    </footer>

                </form>
            </div>
        </div>
    );
};

export default MetaMaskPass;