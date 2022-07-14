import React, {useState} from 'react';
import './PreviewPage.css';
import {useNavigate} from "react-router-dom";
import {
    anFade,
    anFadeLeft1s,
    anFadeRight1s,
    anFade2s,
    anFadeOut,
    anFadeLeftOut,
    anFadeRightOut
} from '../../animations';
import {Button} from "react-bootstrap";

const PreviewPage = () => {

    const navigate = useNavigate();

    //anim states
    const [anFadeOutS,setAnFadeOut] = useState(anFade)
    const [anFadeOut2sS,setAnFadeOut2s] = useState(anFade2s)
    const [anFadeLeftOutS,setAnFadeLeftOut] = useState(anFadeLeft1s)
    const [anFadeRightOutS,setAnFadeRightOut] = useState(anFadeRight1s)

    const handleStart = () =>{
        setAnFadeOut(anFadeOut)
        setAnFadeLeftOut(anFadeLeftOut)
        setAnFadeRightOut(anFadeRightOut)
        setAnFadeOut2s(anFadeRightOut)
        setTimeout(navigateStart,1200)
    }

    const navigateStart = () =>{
        navigate('/choose')
    }

    return (
        <div className='block-container preview-page'>

            <img className={`treug-right-img ${anFadeOutS}`} src="./images/preview-page/treug-right.svg" alt=""/>
            <img className={`shape-left-img ${anFadeOutS}`} src="./images/preview-page/shape-left.svg" alt=""/>
            <img className={`aid-img ${anFadeLeftOutS}`} src="./images/preview-page/aid.svg" alt=""/>
            <img className={`kun-img ${anFadeRightOutS}`} src="./images/preview-page/kun.svg" alt=""/>
            <img className={`kun-stipes-img ${anFadeOut2sS}`} src="./images/preview-page/kun-stipes.svg" alt=""/>

            <a
                onClick={handleStart}
                className={`start-link ${anFadeOut2sS}`}
            >
                START <img src="./images/preview-page/arrow-left.svg" alt=""/>
            </a>
        </div>
    );
};

export default PreviewPage;