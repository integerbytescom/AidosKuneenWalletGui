import React from 'react';
import './PreviewPage.css';
import {Link} from "react-router-dom";

const PreviewPage = () => {

    return (
        <div className='block-container'>
            <Link to='/choose' variant='dark'>Start</Link>
        </div>
    );
};

export default PreviewPage;