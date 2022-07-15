import React from 'react';
import {Modal, Button, Form} from "react-bootstrap";

const RecoverModal = (props) => {
    return (
        <Modal
            className={`recover-modal`}
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <h3 className={`modal-title`}>
                    Recover from seed
                </h3>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>enter 12/24 mnemonic seed words </Form.Label>
                        <Form.Control type="number" placeholder="enter 12/24 mnemonic seed words " />
                    </Form.Group>
                    <Button type={"submit"}>Enter seed words</Button>
                </Form>
            </Modal.Body>
            {/*<Modal.Footer>*/}
            {/*    <Button onClick={props.onHide}>Close</Button>*/}
            {/*</Modal.Footer>*/}
        </Modal>
    );
};

export default RecoverModal;