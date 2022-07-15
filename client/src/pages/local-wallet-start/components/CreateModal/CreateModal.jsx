import React, {useState} from 'react';
import {Modal,Button,Form,Alert} from "react-bootstrap";
import SeedModal from "../SeedModal/SeedModal";
import './CreateModal.css';

const CreateModal = (props) => {

    //modal seed state
    const [modalSeed, setModalSeed] = useState(false);
    //password state
    const [password,setPassword] = useState('')
    const [passwordCopy,setPasswordCopy] = useState('')
    //code phrase state
    const [passphrase,setPassphrase] = useState('')
    //error and alert states
    const [error,setError] = useState('')
    const [alertDisplay,setAlertDisplay] = useState('none')

    //invalid input state
    const [invalidMinChar,setInvalidMinCha] = useState('')
    const [invalidBadPass,setInvalidBadPass] = useState('')

    const handleCreateNewWallet = async (e) => {
        e.preventDefault()
        setInvalidMinCha('')
        setInvalidBadPass('')
        if(password.length < 8){
            setError('Password is too short. Min 8 char.')
            setAlertDisplay('block')
            setInvalidMinCha('invalid')
            setPassword('')
            setPasswordCopy('')
        }else {
            if (password === passwordCopy){
                const res = await window.walletAPI.createWalletNew(password)
                console.log(JSON.parse(res))
                let resultObj = JSON.parse(res)
                if (resultObj.ok === true){
                    await setPassphrase(resultObj.data[1])
                    setModalSeed(true)
                    props.onHide()
                }else {
                    alert('error')
                }
            }else {
                setError('Passwords not matched')
                setAlertDisplay('block')
                setInvalidBadPass('invalid')
                setPassword('')
                setPasswordCopy('')
            }
        }
    }

    return (
        <>
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className={`create-modal`}
        >
            <Modal.Header closeButton>
                <h3 className={`modal-title`}>
                    Create new wallet
                </h3>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleCreateNewWallet}>
                    <Form.Group className="mb-3">
                        <Form.Control
                            className={`modal-input ${invalidMinChar}`}
                            type="password"
                            placeholder="CREATE PASSWORD"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control
                            className={`modal-input ${invalidBadPass}`}
                            type="password"
                            placeholder="INSERT AGAIN"
                            value={passwordCopy}
                            onChange={event => setPasswordCopy(event.target.value)}
                        />
                    </Form.Group>

                    <p className={'error-modal'} style={{display:`${alertDisplay}`}} variant="danger">
                        {error}
                    </p>

                    <button className={`modal-button`} type={"submit"}>ENTER</button>
                </Form>
            </Modal.Body>

        </Modal>

            {/*seed modal*/}
        <SeedModal
            show={modalSeed}
            onHide={() => setModalSeed(false)}
            passphrase={passphrase}
            password={password}
        />
    </>
    );
};

export default CreateModal;