import React,{useState} from 'react';
import './Send.css';
import {anFadeOut, anFade} from "../../../../animations";
import {useLocation, useNavigate} from "react-router-dom";
import Errors from "../../../../general-components/Errors/Errors";
import ModalConfirm from "./modalsSend/ModalConfirm/ModalConfirm";
import ModalClose from "./modalsSend/ModalClose/ModalClose";
import {checkLightTheme} from "../../../../lightThemeCheck";
import {Spinner} from "react-bootstrap";
import sendTrans from "../../../../sendTrans";

const Send = (props) => {

    //for navigate to next page
    const navigate = useNavigate()
    //for path
    const path = useLocation().pathname;


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

    //state for stake
    const [stakeValue,setStakeValue] = useState(null)
    const [displayButState,setDispalyButState] = useState(true)

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
    const getBalanceStake = async () =>{
        const adress = localStorage.getItem('adress')
        const balance = JSON.parse(await window.walletAPI.stakedBalance(adress))
        return balance.data[adress].substr(0, 17)/1000000000000000000
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

    const handleStake = async (e) =>{
        e.preventDefault()
        if (stakeValue > getBalance){
            setErrorFun('У вас нет столько денег')
        }else {
            setDispalyButState(false)
            const adress = localStorage.getItem('adress')
            const seed = localStorage.getItem('seed')
            const stake = JSON.parse(await window.walletAPI.stake('gas',`"${seed}"`,adress,stakeValue))
            // console.log(stake.ok)
            let dataTransStake = await sendTrans('stake')
            if (stake.ok===false){
                setErrorFun("Stake не прошел, попробуйте позже")
                setTimeout(() => navigateOut('/wallet/staking'),3000)
            }else {
                if (dataTransStake[0]===null){
                    dataTransStake = [{adress: adress, adk: stakeValue, method: 'Stake'}]
                }else {
                    dataTransStake.push({adress: adress, adk: stakeValue, method: 'Stake'})
                }
                window.localStorage.setItem('stake',JSON.stringify(dataTransStake))
                await window.walletAPI.updateBalance()
                setDispalyButState(true)
                navigate('/wallet/staking')
            }
        }
    }

    const navigateOut = (path) =>{
        navigate(path)
    }

    const handleUnstake = async (e) =>{
        e.preventDefault()
        if (stakeValue > getBalanceStake){
            setErrorFun('У вас нет столько денег')
        }else {
            const adress = localStorage.getItem('adress')
            const seed = localStorage.getItem('seed')
            const unstake = JSON.parse(await window.walletAPI.unstake('gas',`"${seed}"`,adress,stakeValue))
            // console.log(unstake.ok)
            // console.log(seed)
            // console.log(adress)
            // console.log(stakeValue)
            // console.log(unstake)
            if (unstake.ok===false){
                setErrorFun("unstake не прошел, попробуйте позже")
                setTimeout(() => navigateOut('/wallet/staking'),3000)
            }else {
                await window.walletAPI.updateBalance()
                setDispalyButState(true)
                navigate('/wallet/staking')
            }
        }
    }

    const setAllADK = async (e) =>{
        e.preventDefault()
        const value = await getBalance()
        setAdkValue(value)
    }
    const setAllADKStake = async (e) =>{
        e.preventDefault()
        const value = await getBalance()
        setStakeValue(value)
    }
    const setAllADKUnstake = async (e) =>{
        e.preventDefault()
        const value = await getBalanceStake()
        setStakeValue(value)
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
                        //check stake or unstake
                        path==='/wallet/stake'?
                        <form onSubmit={event => handleStake(event)} className="form-create-pass blue">
                            <div className={`adk-value ${checkLightTheme()}`}>
                                <input
                                    className={`input-gray blue ${checkLightTheme()}`}
                                    type="text"
                                    placeholder={`0.00`}
                                    value={stakeValue}
                                    onChange={event => setStakeValue(event.target.value)}
                                />
                                <div className="but-container blue">
                                    <button onClick={setAllADKStake} className={`all-send ${checkLightTheme()}`}>All</button>
                                    <h3>ADK</h3>
                                </div>
                            </div>

                            <div className="butt-container">
                                {
                                    displayButState?
                                        <button type={"submit"} className={`border-button blue ${checkLightTheme()}`}>Stake</button>:
                                        <Spinner animation="grow" variant={checkLightTheme()==='light'?"secondary":"light"} />
                                }
                            </div>
                        </form>:
                            <form onSubmit={event => handleUnstake(event)} className="form-create-pass blue">
                                <div className={`adk-value ${checkLightTheme()}`}>
                                    <input
                                        className={`input-gray blue ${checkLightTheme()}`}
                                        type="text"
                                        placeholder={`0.00`}
                                        value={stakeValue}
                                        onChange={event => setStakeValue(event.target.value)}
                                    />
                                    <div className="but-container blue">
                                        <button onClick={setAllADKUnstake} className={`all-send ${checkLightTheme()}`}>All</button>
                                        <h3>ADK</h3>
                                    </div>
                                </div>

                                <div className="butt-container">
                                    {
                                        displayButState?
                                            <button type={"submit"} className={`border-button blue ${checkLightTheme()}`}>Unstake</button>:
                                            <Spinner animation="grow" variant={checkLightTheme()==='light'?"secondary":"light"} />
                                    }
                                </div>
                            </form>
                        :
                        //send standart
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