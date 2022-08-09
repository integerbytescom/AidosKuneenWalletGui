import React from 'react';
import {Modal} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import './ModalClose.css';

const ModalClose = (props) => {

    const navigate = useNavigate()

    const handleOut = () =>{
        props.blue?navigate('/wallet/staking'):navigate('/wallet')
    }

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            // size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            className={`settings-modal close`}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Вы уверены что хотите выйти?
                </p>
            </Modal.Body>
            <Modal.Footer>
                <button className={'border-button'} onClick={handleOut}>Да</button>
                <button className={'gray-button modal-close'} onClick={props.onHide}>Отменить</button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalClose;