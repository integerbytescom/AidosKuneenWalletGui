import React, {useState} from 'react';
import './ChoosePage.css';
import {Link, useNavigate} from "react-router-dom";
import {anFade1s, anFade, anFadeRight1500ms, anFadeRight1s, anFadeRightOut, anFadeOut} from "../../animations";

const ChoosePage = () => {

    const navigate = useNavigate()

    const [anFadeS,setAnFadeS] = useState(anFade)
    const [anFade1sS,setAFade1sS] = useState(anFade1s)
    const [anFadeRight1500msS,setAnFadeRight1500msS] = useState(anFadeRight1500ms)
    const [anFadeRight1sS,setAnFadeRight1sS] = useState(anFadeRight1s)

    const chooseLink = (e,url) =>{
        e.preventDefault()
        setAnFadeS(anFadeOut)
        setAFade1sS(anFadeOut)
        setAnFadeRight1500msS(anFadeRightOut)
        setAnFadeRight1sS(anFadeRightOut)
        setTimeout(() => navigateChoose(url),1200)
    }

    const navigateChoose = (url) =>{
        navigate(url)
    }

    return (
        <div className='block-container'>
            <div className="choose-page">

                <img className={`right-lines-ch ${anFadeS}`} src="./images/choose-page/right-lines.svg" alt=""/>
                <img className={`circles-ch ${anFadeS}`} src="./images/choose-page/circles.svg" alt=""/>
                <img className={`helmet-ch ${anFade1sS}`} src="./images/choose-page/helmet.svg" alt=""/>
                
                <a
                    className={`lw-start ${anFadeRight1500msS}`}
                    onClick={(e) => chooseLink(e,'/lwstart')}
                >
                    Local wallet <img src="./images/choose-page/arrow-left.svg" alt=""/>
                </a>

                <a
                    className={`mm-start ${anFadeRight1sS}`}
                    onClick={(e) => chooseLink(e,'/lwstart')}
                    >
                    Metamask Wallet <img src="./images/choose-page/arrow-left.svg" alt=""/>
                </a>
            </div>
        </div>
    );
};

export default ChoosePage;