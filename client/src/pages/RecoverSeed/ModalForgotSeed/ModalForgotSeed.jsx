import React from 'react';
import {checkLightTheme} from "../../../lightThemeCheck";
import {CloseButton, Modal} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {getBalance} from "../../../getBalance";

const ModalForgotSeed = (props) => {

    const navigate = useNavigate()

    const handleDeleteUser = async () =>{
        window.localStorage.clear();
        window.localStorage.setItem('hints',true)
        window.localStorage.setItem('security',15)
        window.localStorage.setItem('adrsRec',1)
        window.localStorage.setItem('totalStake',0)
        window.localStorage.setItem('totalBalance',0)
        await getBalance()
        navigate('/createWallet')
    }

    return (
        <div>
            <Modal
                show={props.show}
                onHide={props.onHide}
                // size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                className={`settings-modal close ${checkLightTheme()}`}
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
                    <CloseButton onClick={props.onHide} variant={checkLightTheme()?"":"white"} />
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Сurrent user profile will be deleted,
                        and he need to use the seed to restore
                        his wallet or start new wallet.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <button className={`border-button ${checkLightTheme()}`} onClick={handleDeleteUser}>Yes</button>
                    <button className={`gray-button modal-close ${checkLightTheme()}`} onClick={props.onHide}>No</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ModalForgotSeed;