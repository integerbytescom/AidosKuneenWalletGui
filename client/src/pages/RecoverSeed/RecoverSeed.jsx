import React, {useEffect, useState} from 'react';
import './RecoverSeed.css';
import {useNavigate} from "react-router-dom";
import {anFade, anFadeLeftOut, anFadeOut, anFadeRight} from "../../animations";
import {checkLightTheme} from "../../lightThemeCheck";

const RecoverSeed = () => {

    const navigate = useNavigate()

    const [fade,setFade] = useState(anFade)
    const [fadeLeft,setFadeLeft] = useState(anFadeRight)

    const [seedInp,setSeedInp] = useState('')

    const [disEnterSeed,setDisEnterSeed] = useState(true)

    const handleRecoverSeed = (url,event) =>{
        window.localStorage.setItem('seedMnemonic',seedInp)
        event.preventDefault()
        setFade(anFadeOut)
        setFadeLeft(anFadeLeftOut)
        setTimeout(() => navigateRoute(url),1000)
    }

    const navigateRoute = (url) =>{
        navigate(url)
    }

    useEffect(() =>{
        const checkDisable = () =>{
            if (seedInp === ''){
                setDisEnterSeed(true)
            }else {
                setDisEnterSeed(false)
            }
        }
        checkDisable()
    })

    return (
            <div className={`block-container ${checkLightTheme()}`}>

                <div className={`dots-create ${fade}`}>
                    <div className="dot active"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>

                <div className={`rec-seed-form-container ${fadeLeft}`}>
                    <h2 className={checkLightTheme()}>Recover from seed</h2>
                    <form>
                        <textarea
                            rows="3"
                            style={{resize: 'none'}}
                            className={`input-gray ${checkLightTheme()}`}
                            placeholder={`enter 12/24 mnemonic seed words `}
                            value={seedInp}
                            onChange={event => setSeedInp(event.target.value)}
                        />

                        <div className="footer">
                            <button className={`gray-button ${checkLightTheme()}`} onClick={() => navigateRoute('/')}>
                                Cancel
                            </button>
                            <button disabled={disEnterSeed} className={`blue-button ${checkLightTheme()}`} onClick={event => handleRecoverSeed('/createPass',event)}>
                                Enter seed words
                            </button>
                        </div>
                    </form>
                </div>
            </div>
    );
};

export default RecoverSeed;