import React from 'react';
import {Modal, Button, Form} from "react-bootstrap";

const RecoverModal = (props) => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Recover from seed
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>enter 12/24 mnemonic seed words </Form.Label>
                        <Form.Control type="number" placeholder="enter 12/24 mnemonic seed words " />
                    </Form.Group>
                    <Button type={"submit"}>ENTER seed words</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RecoverModal;