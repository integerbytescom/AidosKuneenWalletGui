import React, {useState} from 'react';
import {Modal,Button,Form,Alert} from "react-bootstrap";
// import {useNavigate} from "react-router-dom";
import SeedModal from "../SeedModal/SeedModal";

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

    const handleCreateNewWallet = async (e) => {
        e.preventDefault()
        if(password.length < 8){
            setError('minimum password length 8 characters')
            setAlertDisplay('block')
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
                setError('passwords not matched')
                setAlertDisplay('block')
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
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create new wallet
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleCreateNewWallet}>
                    <Form.Group className="mb-3">
                        <Form.Label>creat password</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="creat password"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>insert again</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="insert again"
                            value={passwordCopy}
                            onChange={event => setPasswordCopy(event.target.value)}
                        />
                    </Form.Group>

                    <Alert style={{display:`${alertDisplay}`}} variant="danger">
                        {error}
                    </Alert>

                    <Button type={"submit"}>ENTER</Button>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>


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