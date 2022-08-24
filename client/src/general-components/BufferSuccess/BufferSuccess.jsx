import React, {useState} from 'react';
import {Alert} from "react-bootstrap";
import './BufferSuccess.css';

const BufferSuccess = () => {

    return (
        <Alert
            key={'success'}
            variant={'success'}
            className={`alert-buffer`}
        >
            Copied!
        </Alert>
    );
};

export default BufferSuccess;