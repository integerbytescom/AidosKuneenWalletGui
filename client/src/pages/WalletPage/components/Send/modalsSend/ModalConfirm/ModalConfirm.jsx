import React, {useState} from 'react';
import {Modal, Spinner} from "react-bootstrap";
import './ModalConfirm.css'

const ModalConfirm = (props) => {

    const [display,setDisplay] = useState(false)
    const [displayText,setDisplayText] = useState(true)
    const [message,setMessage] = useState(false)

    const handleSend = async () =>{
        setDisplay(true)
        const trans = JSON.parse(await window.walletAPI.send(props.way,`"${props.mempas}"`,props.from,props.to,props.adkValue))
        if (trans.ok === true){
            setMessage('Отправлено')
            setDisplayText(false)
            setTimeout(props.onHide(),20000)
        }else {
            alert('Произошла ошибка попробуйте позже')
        }
    }

    console.log(props.way)
    console.log(props.mempas)
    console.log(props.from)
    console.log(props.to)
    console.log(props.adkValue)

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            // size="lg"
            className={'settings-modal confirm'}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {displayText?
                    <p>
                        Вы уверены что хотите отправить
                        <span> {props.adkValue}ADK </span>
                        на адрес
                        <span> {props.to} </span>?
                    </p>:
                    <p>{message}</p>
                }
                {display===false?'':<Spinner style={{marginTop:10}} animation="grow" variant="light" />}
            </Modal.Body>
            <Modal.Footer style={{alignItems:'flex-end'}}>
                {display===false?
                    <>
                        <button className={'border-button'} onClick={handleSend}>Да</button>
                        <button className={'gray-button modal-close'} onClick={props.onHide}>Нет</button>
                    </>:''
                }
            </Modal.Footer>
        </Modal>
    );
};

export default ModalConfirm;