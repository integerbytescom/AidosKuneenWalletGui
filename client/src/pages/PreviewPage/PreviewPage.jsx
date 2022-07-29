import React, {useState} from 'react';
import './PreviewPage.css';
import {useNavigate} from "react-router-dom";
import { anFade1s, anFade2s, anFadeOut, anFade} from "../../animations";

const PreviewPage = () => {

    const navigate = useNavigate()

    const [fade,setFade] = useState(anFade)
    const [fade1s,setFade1s] = useState(anFade1s)
    const [fade2s,setFade2s] = useState(anFade2s)

    const handleNextPage = () =>{
        setFade(anFadeOut)
        setFade1s(anFadeOut)
        setFade2s(anFadeOut)
        setTimeout(navigateAuth,600)
    }

    const navigateAuth = () => {
        navigate('/auth')
    }

    return (
        <div className={`preview-page`}>
            <div  className={`block-container top-waves ${fade}`} style={{backgroundImage:`url('./images/preview-page/waves-top.svg')`}}>

                <img className={`wallet-preview ${fade1s}`} src="./images/preview-page/wallet.png" alt="wallet"/>
                {/*shadow wallet*/}
                <div className={`wallet-shadow-container ${fade2s}`}>
                    <img className={`shadow-preview shd`} src="./images/preview-page/shadows-wallet/shadow.svg" alt={``}/>
                    <img className={`shadow-preview shd1`} src="./images/preview-page/shadows-wallet/shadow1.svg" alt={``}/>
                </div>

                <button onClick={handleNextPage} className={`blue-button ${fade2s}`} >
                    Start <img src="./images/preview-page/arrow.svg" alt="arrow"/>
                </button>

            </div>
        </div>
    );
};

export default PreviewPage;