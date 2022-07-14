import React, {useState} from 'react';
import './PasswordModal.css';
import {Modal, Button, Form} from "react-bootstrap";
import {useNavigate} from 'react-router-dom';

//global value for pass
export let passGLOBAL = '';

const PasswordModal = (props) => {

    const navigate = useNavigate();

    const [lastPass,setLastPass] = useState('')

    const handleSubmitPassword = (e) => {
        e.preventDefault()
        if (lastPass === props.password){
            passGLOBAL = lastPass;
            navigate('/transfer');
        }else {
            alert('Bad password');
        }
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Enter Password
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmitPassword}>
                    <Form.Group className="mb-3" controlId="formBasicPasswordAgain">
                        <Form.Label>pass</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="insert again"
                            onChange={event => setLastPass(event.target.value)}
                        />
                    </Form.Group>
                    <Button type={"submit"}>ENTER</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PasswordModal;
