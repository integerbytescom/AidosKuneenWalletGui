import React, {useState} from 'react';
import {Modal, Spinner} from "react-bootstrap";
import './ModalConfirm.css'
import {useNavigate} from "react-router-dom";
import {checkLightTheme} from "../../../../../../lightThemeCheck";
import sendTrans from "../../../../../../sendTrans";

const ModalConfirm = (props) => {

    const navigate = useNavigate()

    const [display,setDisplay] = useState(false)
    const [displayText,setDisplayText] = useState(true)
    const [message,setMessage] = useState(false)
    const [spinnerDisplay,setSpinnerDisplay] = useState('block')

    const handleSend = async () =>{
        setDisplay(true)
        const trans = JSON.parse(await window.walletAPI.send(props.way,`"${props.mempas}"`,props.from,props.to,props.adkValue))
        console.log(trans,'TRANS')
        if (trans.ok === true){
            let dataTransSend = await sendTrans('send')
            if (dataTransSend[0]===null){
                dataTransSend = [{from: props.from, to:props.to, adk: `- ${props.adkValue}`, status: 'Confirmed'}]
            }else {
                dataTransSend.push({from: props.from, to:props.to, adk: `- ${props.adkValue}`, status: 'Confirmed'})
            }
            window.localStorage.setItem('send',JSON.stringify(dataTransSend))
            setMessage('Отправлено')
            await window.walletAPI.updateBalance()
            console.log(trans,'TRANS')
            setSpinnerDisplay('none')
            setDisplayText(false)
        }else {
            alert('Произошла ошибка попробуйте позже')
        }
    }

    // console.log(props.way)
    // console.log(props.mempas)
    // console.log(props.from)
    // console.log(props.to)
    // console.log(props.adkValue)

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
                    <div className={'send-success'}>
                        <p style={{marginBottom:'30px'}}>{message}</p>
                        <button onClick={() => navigate(`/wallet`)} className={`border-button ${checkLightTheme()}`}>Ok</button>
                    </div>
                }
                {display===false?'':<Spinner style={{marginTop:10,display:spinnerDisplay}} animation="grow" variant="light" />}
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