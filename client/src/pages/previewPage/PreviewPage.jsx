import React, {useState} from 'react';
import './PreviewPage.css'
import {useNavigate} from "react-router-dom";


const PreviewPage = () => {

    const navigate = useNavigate();

    const [animTop,setAnimTop] = useState('animate__fadeInTopRight animate__delay-1s')
    const [animBottom,setAnimBottom] = useState('animate__fadeInBottomLeft animate__delay-1s')
    const [animFade,setAnimFade] = useState('animate__fadeIn animate__slower')
    const [animFadeSlower,setAnimFadeSlower] = useState('animate__fadeIn animate__delay-2s')

    const handleRoute = () =>{
        setAnimTop('animate__fadeOutTopRight')
        setAnimBottom('animate__fadeOutBottomLeft')
        setAnimFadeSlower('animate__fadeOutRight animate__fast animate__delay-.3s')
        setAnimFade('animate__fadeOut')
        return setTimeout(()=>navigate('/choose'),1000)
    }

    return (
        <div className={`preview-page animate__animated animate__fast ${animFade}`}>
            <div className={`bg-waves-preview`}></div>
            <div className='stripe-container'>
                <img
                    className={`stripe-left animate__animated animate__fast ${animBottom}`}
                    src="/images/previewPage/leftstripe.svg"
                    alt="leftstripe-preview"
                />

                <div className={`content animate__animated animate__fast ${animFadeSlower}`}>
                    <h2>AIDOS KUNEEN</h2>
                    <button onClick={handleRoute}>
                        <p>START</p>
                        <img src='/images/previewPage/arrow-left.svg' alt='arrow'/>
                    </button>
                </div>

                <img
                    className={`stripe-right animate__animated animate__fast ${animTop}`}
                    src="/images/previewPage/right-stripe.svg"
                    alt="rightstripe-preview"
                />
                <img
                    className={`stripe-opac animate__animated animate__fast ${animFadeSlower}`}
                    src="/images/previewPage/stripe-opac.svg"
                    alt="stripe-opas"
                />
            </div>
        </div>
    );
};

export default PreviewPage;