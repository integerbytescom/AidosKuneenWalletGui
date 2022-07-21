import React, {useEffect, useState} from 'react';
import './PreviewPage.css';
import {Link} from "react-router-dom";
import {anFadeSlow, anFade1s, anFade2sSlow} from "../../animations";

const PreviewPage = () => {

    const [fadeSlow,setFadeSlow] = useState(anFadeSlow)
    const [fade1s,setFade1s] = useState(anFade1s)
    const [fade2sSlow,setFade2sSlow] = useState(anFade2sSlow)


    return (
        <div className={`preview-page`}>
            <div className={`block-container`}>

                <img className={`waves-preview ${fadeSlow}`} src="./images/preview-page/waves.svg" alt="waves"/>
                <img className={`shadow-waves-preview`} src="./images/preview-page/shadow-waves.svg" alt="waves"/>

                <img className={`wallet-preview ${fade1s}`} src="./images/preview-page/wallet.svg" alt="wallet"/>
                {/*shadow wallet*/}
                <div className={`wallet-shadow-container ${fade2sSlow}`}>
                    <img className={`shadow-preview shd`} src="./images/preview-page/shadows-wallet/shadow.svg" alt={``}/>
                    <img className={`shadow-preview shd1`} src="./images/preview-page/shadows-wallet/shadow1.svg" alt={``}/>
                </div>

                <Link to={`/`} className={`link-preview ${fade2sSlow}`}>Start <img src="./images/preview-page/arrow.svg" alt="arrow"/></Link>

            </div>
        </div>
    );
};

export default PreviewPage;