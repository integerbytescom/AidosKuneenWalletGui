import React, {useEffect, useState} from 'react';
import './ChooseWalletPage.css';
import {Link} from "react-router-dom";

const ChooseWalletPage = () => {

    const [dotsAnim,setDotsAnim] = useState(' animate__fadeIn animate__slow animate__delay-.8s')
    useEffect(()=>{
        setTimeout(setDotsAnim(''),1200)
    },[dotsAnim])

    return (
        <div className='choose-wallet-page animate__animated animate__fadeIn animate__faster'>
            <div className="block-logo">
                <img src="/images/chooseWalletPage/logo.svg" alt="logo"/>
                <h4>AIDOS KUNEEN</h4>
            </div>

            <div className={`bg-waves-choose`}></div>

            <img
                className='stripe-choose animate__animated animate__fadeInBottomLeft animate__delay-1.2s'
                src="/images/chooseWalletPage/stripeChoose.svg"
                alt="stripeChoose"
            />

            <img
                className={`dots-choose animate__animated ${dotsAnim}`}
                src="/images/chooseWalletPage/dotsChoose.svg"
                alt="dotsChoose"
            />


                    <Link className='link-choose local-wallet animate__animated animate__fadeInLeft' to='/'>
                        <p>Local Wallet</p>
                        <img src="/images/previewPage/arrow-left.svg" alt="arrow"/>
                    </Link>

                    <Link className='link-choose metamask animate__animated animate__fadeInLeft' to='/'>
                        <p>Metamask</p>
                        <img src="/images/previewPage/arrow-left.svg" alt="arrow"/>
                    </Link>

        </div>
    );
};

export default ChooseWalletPage;