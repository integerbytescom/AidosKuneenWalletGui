import React, {useState} from 'react';
import './AboutUsPage.css';
import {anFade, anFade1s} from "../../animations";

const AboutUsPage = () => {

    const [fade,setFade] = useState(anFade)
    const [fade1s,setFade1s] = useState(anFade1s)

    return (
        <div className={`about-us-page ${fade}`}>

            <img className={`waves-about ${fade1s}`} src="./images/wallet-page/waves-shd.svg" alt=""/>
            
            <div className="container-info">
                <div className="info left">
                    
                </div>
                <div className="info right">

                </div>
                <div className="info left">

                </div>
            </div>
        </div>
    );
};

export default AboutUsPage;