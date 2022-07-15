import React, {useState} from 'react';
import './PasswordModal.css';
import {Modal, Form} from "react-bootstrap";
import {useNavigate} from 'react-router-dom';

//global value for pass
export let passGLOBAL = '';

const PasswordModal = (props) => {

    const navigate = useNavigate();

    //password state
    const [lastPass,setLastPass] = useState('')

    //error and alert states
    const [error,setError] = useState('')
    const [alertDisplay,setAlertDisplay] = useState('none')
    const [invalidBadPass,setInvalidBadPass] = useState('')

    const handleSubmitPassword = (e) => {
        e.preventDefault()
        if (lastPass === props.password){
            passGLOBAL = lastPass;
            navigate('/transfer');
        }else {
            setLastPass('')
            setError('Invalid password');
            setInvalidBadPass('invalid')
            setAlertDisplay('block')
        }
    }

    return (
        <Modal
            className={`password-modal`}
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <h3 className={`modal-title`}>
                    Enter Password
                </h3>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmitPassword}>
                    <Form.Group className="mb-3" controlId="formBasicPasswordAgain">
                        <Form.Control
                            className={`modal-input ${invalidBadPass}`}
                            type="password"
                            placeholder="Insert again"
                            onChange={event => setLastPass(event.target.value)}
                        />
                    </Form.Group>

                    <p className={`error-modal`} style={{display:`${alertDisplay}`}}>
                        {error}
                    </p>

                    <button className={`modal-button`} type={"submit"}>ENTER</button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default PasswordModal;
