import React from 'react';
import './ChoosePage.css';
import {Link} from "react-router-dom";

const ChoosePage = () => {

    return (
        <div className='block-container'>
            <Link to='/lwstart' variant='dark'>LOCAL WALLET</Link>

            <Link style={{marginLeft:"20px"}} to='/lwstart' variant='dark'>METAMASK</Link>
        </div>
    );
};

export default ChoosePage;