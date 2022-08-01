import React from 'react';
import {Alert} from "react-bootstrap";
import './Errors.css';

const Errors = (props) => {
    return (
        <Alert className={`errors-block`} key={'danger'} variant={'danger'}>
            {props.error}
        </Alert>
    );
};

export default Errors;