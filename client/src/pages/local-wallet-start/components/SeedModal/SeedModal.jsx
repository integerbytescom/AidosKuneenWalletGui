import React, {useState} from 'react';
import {Modal,Button} from "react-bootstrap";
import PasswordModal from "../PasswordModal/PasswordModal";


const SeedModal = (props) => {

    const [modalPass,setModalPass] = useState(false);

    const handleSeed = () => {
        props.onHide()
        setModalPass(true)
    }

    return (
        <>
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Seed
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.passphrase}<br />
                {/*{props.password}*/}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={handleSeed}
                >
                    i have stored this seed in a safe place
                </Button>
            </Modal.Footer>

        </Modal>

        <PasswordModal
            onHide={() => setModalPass(false)}
            show={modalPass}
            password={props.password}
        />
    </>
    );
};

export default SeedModal;