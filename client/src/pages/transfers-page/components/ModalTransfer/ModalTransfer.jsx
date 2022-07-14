import React, {useState} from 'react';
import './ModalTransfer.css';
import {Modal, Button, Form} from "react-bootstrap";

const ModalTransfer = (props) => {

    const [amount,setAmount] = useState('');
    const [walletAdress,setWalletAdress] = useState('');
    const [radioValue,setRadioValue] = useState('')

    const handleSend = (e) =>{
        e.preventDefault()
        console.log('adress: ',walletAdress);
        console.log('amount: ',amount)
        console.log('radioValue: ',radioValue)
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
                    Modal transfer
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSend}>
                    <input value={walletAdress} onChange={event => setWalletAdress(event.target.value)} type="text" placeholder={'wallet adress'}/><br />
                    <input value={amount} onChange={event => setAmount(event.target.value)} type="number" placeholder={'summa'}/><br />
                    <br />

                    <input type="radio" id="radio-gas" name="contact" onClick={() => setRadioValue('gas')} />
                    <label htmlFor="radio-gas">Pay GAS (instant, 0.021 ADK fee)</label><br />
                    <input type="radio" id="radio-pow" name="contact" onClick={() => setRadioValue('pow')} />
                    <label htmlFor="radio-pow">Do proof to work (instant, 0 ADK fee)</label>

                    <Button onClick={props.onHide} variant={"outline-success"}>Cancel</Button>
                    <Button type={"submit"} variant={"success"}>Send</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ModalTransfer;