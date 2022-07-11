import React from 'react';
import {Modal,Button,Form} from "react-bootstrap";

const CreateModal = (props) => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create new wallet
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>creat password</Form.Label>
                        <Form.Control type="password" placeholder="creat password" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPasswordAgain">
                        <Form.Label>insert again</Form.Label>
                        <Form.Control type="password" placeholder="insert again" />
                    </Form.Group>

                    <Button type={"submit"}>ENTER PASSWORD</Button>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateModal;