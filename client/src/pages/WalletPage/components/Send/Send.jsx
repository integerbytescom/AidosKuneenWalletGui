import React,{useState} from 'react';
import './Send.css';
import {anFadeOut, anFade} from "../../../../animations";
import {useNavigate} from "react-router-dom";
import Errors from "../../../../general-components/Errors/Errors";
import ModalConfirm from "./modalsSend/ModalConfirm/ModalConfirm";
import ModalClose from "./modalsSend/ModalClose/ModalClose";
import {checkLightTheme} from "../../../../lightThemeCheck";

const Send = (props) => {

    const navigate = useNavigate()

    const [fade,setFade] = useState(anFade)

    //modals
    const [modalConfirm,setModalConfirm] = useState(false)
    const [modalClose,setModalClose] = useState(false)

    // states for inputs
    const [to,setTo] = useState('')
    const [mempasState,setMempasState] = useState('')
    const [fromState,setFromState] = useState('')
    const [adkValue,setAdkValue] = useState(null)
    const [checkValue,setCheckValue] = useState(0)
    console.log(checkValue,'checkValue')

    const [error,setError] = useState('')
    const setErrorFun = (text) =>{
        setError(text)
        setTimeout(() => setError(''),3000)
    }

    const handleCloseSend = () =>{
        setModalClose(true)
    }

    const getBalance = async () =>{
        const adress = localStorage.getItem('adress')
        const balance = JSON.parse(await window.walletAPI.balance(adress))
        return balance.data[adress]/1000000000000000000
    }

    const handleSend = async (e) =>{
        e.preventDefault()
        if (to.length !== 42){
            setErrorFun('Введите правильный адрес')
        }else if(adkValue > getBalance){
            setErrorFun('У вас нет столько денег')
        }else if(checkValue === 0){
            setErrorFun('Выберите способ отправки')
        }
        else {
            const openModalConsfirm = async () =>{
                await setMempasState(localStorage.getItem('seed'))
                await setFromState(localStorage.getItem('adress'))
                setModalConfirm(true)
            }
            openModalConsfirm()
        }
    }

    const setAllADK = async (e) =>{
        e.preventDefault()
        const value = await getBalance()
        setAdkValue(value)
    }

    return (
        <div className={`block-container menu ${fade} ${checkLightTheme()}`}>

            {error!==''?<Errors error={error} />:''}
            <ModalConfirm
                show={modalConfirm}
                onHide={() => setModalConfirm(false)}
                way={checkValue===1?'gas':'pow'}
                mempas={mempasState}
                from={fromState}
                to={to}
                adkValue={adkValue}
            />
            <ModalClose
                show={modalClose}
                onHide={() => setModalClose(false)}
                blue={props.blue}
            />

            <button onClick={handleCloseSend} className={`close-button ${checkLightTheme()}`}>
                Cancel
            </button>

            <div className={`send-content ${props.blue}`}>
                {
                    props.blue?
                        <img src="./images/wallet-page/logoKrugBlue.svg" alt="logoAidos"/>:
                        <img src="./images/wallet-page/logoKrug.svg" alt="logoAidos"/>
                }

                {
                    props.blue ?
                        <form className="form-create-pass blue">
                            <div className="adk-value">
                                <input className={`input-gray blue ${checkLightTheme()}`} type="text" placeholder={`0.00`} />
                                <div className="but-container blue">
                                    <button onClick={setAllADK} className={'all-send'}>All</button>
                                    <h3>ADK / 2414,455.43 ADK</h3>
                                </div>
                            </div>
                            <div className={`container-usd blue ${checkLightTheme()}`}>
                                <h3>0,00</h3>
                                <h3>USD / 543,342.34 USD</h3>
                            </div>


                            <div className="butt-container">
                                <button className={`border-button blue ${checkLightTheme()}`}>Stake</button>
                            </div>
                        </form>
                        :
                        <form onSubmit={handleSend}>
                            <input
                                className={`input-gray send ${checkLightTheme()}`}
                                type="text"
                                placeholder={`Enter Address`}
                                value={to}
                                onChange={event => setTo(event.target.value)}
                            />

                            <div className={`adk-value ${checkLightTheme()}`}>
                                <input
                                    className={`input-gray ${checkLightTheme()}`}
                                    type="text"
                                    placeholder={''}
                                    value={adkValue}
                                    onChange={event => setAdkValue(event.target.value)}
                                />
                                <div className="but-container">
                                    <button onClick={setAllADK} className={'all-send'}>All</button>
                                    <h3>ADK</h3>
                                </div>
                            </div>
                            {checkValue===1?
                                <p>Fees: 0.021 ADK</p>:
                                checkValue===2?
                                    <p>Fees: 0 ADK</p>:''
                            }

                            <p className={`radio-p ${checkLightTheme()}`}>
                                <input type="radio" checked={checkValue === 1} onChange={() => setCheckValue(1)} />
                                <label htmlFor="answer1">Pay GAS "Fastest"</label>
                            </p>

                            <p className={`radio-p ${checkLightTheme()}`}>
                                <input type="radio" checked={checkValue === 2} onChange={() => setCheckValue(2)} />
                                <label htmlFor="answer2">Do POW</label>
                            </p>

                            <div className="butt-container">
                                <button onClick={handleSend} className={`border-button ${checkLightTheme()}`}>Send</button>
                            </div>
                        </form>
                }
            </div>
        </div>
    );
};

export default Send;