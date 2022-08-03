import React, {useEffect, useState} from 'react';
import './PreviewPage.css';
import {Link, useNavigate} from "react-router-dom";

const PreviewPage = () => {

    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(navigateAuth,17000)
    },[])

    const navigateAuth = () => {
        navigate('/auth')
    }

    return (
        <div className={`block-container preview-page`}>
            <Link to={'/auth'} className="video-wrapper">
                <video playsInline autoPlay muted loop>
                    <source
                        src="./videos/1.webm"
                        type="video/webm" />
                </video>
            </Link>
        </div>
    );
};

export default PreviewPage;