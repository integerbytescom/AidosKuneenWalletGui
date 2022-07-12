import React, {useState} from 'react';
import './PasswordModal.css';
import {Modal, Button, Form} from "react-bootstrap";

const PasswordModal = (props) => {

    const [lastPass,setLastPass] = useState('')

    const handleSubmitPassword = (e) => {
        e.preventDefault()
        if (lastPass === props.password){
            console.log('yahoooo its good')
        }else {
            console.log('noooo its bad pass')
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