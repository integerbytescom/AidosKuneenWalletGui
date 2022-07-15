import React, {useState} from 'react';
import {Modal,Alert} from "react-bootstrap";
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
            className={`seed-modal`}
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <h3 className={`modal-title`}>
                    Your seed
                </h3>
            </Modal.Header>
            <Modal.Body>
                <p>Your mnemonic seed. Don’t share it with anyone.</p>
                <Alert variant={`success`}>
                    {props.passphrase}
                </Alert>
            </Modal.Body>
            <Modal.Footer>
                <button
                    className={`modal-button`}
                    onClick={handleSeed}
                >
                    I HAVE STORED THIS IN A SAFE PLACE
                </button>
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