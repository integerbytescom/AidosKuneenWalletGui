import React,{useState} from 'react';
import './Send.css';
import {anFadeOut, anFade} from "../../../../animations";
import {useNavigate} from "react-router-dom";
import Errors from "../../../../general-components/Errors/Errors";

const Send = (props) => {

    const navigate = useNavigate()

    const [fade,setFade] = useState(anFade)

    // states for inputs
    const [to,setTo] = useState('')
    const [adkValue,setAdkValue] = useState(null)
    const [checkValue,setCheckValue] = useState(1)
    console.log(checkValue,'checkValue')

    const [error,setError] = useState('')
    const setErrorFun = (text) =>{
        setError(text)
        setTimeout(() => setError(''),3000)
    }

    const handleCloseSend = () =>{
        setFade(anFadeOut)
        if (props.blue){
            setTimeout(() => navigateRoute('/wallet/staking'),1000)
        }else {
            setTimeout(() => navigateRoute('/wallet'),1000)
        }
    }

    const getBalance = async () =>{
        const adress = localStorage.getItem('adress')
        const balance = JSON.parse(await window.walletAPI.balance(adress))
        return balance.data[adress]/1000000000000000000
    }
    const getFromLS = async (value) =>{
        return localStorage.getItem(value)
    }

    const handleSend = async (e) =>{
        e.preventDefault()
        if (to.length < 40 || to.length > 45){
            setErrorFun('Введите правильный адрес')
        }else if(adkValue > getBalance){
            setErrorFun('У вас нет столько денег')
        }else{
            const way = checkValue===1?'gas':'pow';
            const mempas = await getFromLS('seed');
            const from = await getFromLS('adress');
            console.log(way);
            console.log(mempas);
            console.log(from);
            console.log(to);
            console.log(adkValue);
            await window.walletAPI.send(way,`"${mempas}"`,from,to,adkValue)
        }
    }

    const navigateRoute = (url) =>{
        navigate(url)
    }

    return (
        <div className={`block-container menu ${fade}`}>

            {error!==''?<Errors error={error} />:''}

            <button onClick={handleCloseSend} className={`close-button`}>
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
                                <input className='input-gray blue' type="text" placeholder={`0.00`} />
                                <div className="but-container blue">
                                    <button className={'all-send'}>All</button>
                                    <h3>ADK / 2414,455.43 ADK</h3>
                                </div>
                            </div>
                            <div className="container-usd blue">
                                <h3>0,00</h3>
                                <h3>USD / 543,342.34 USD</h3>
                            </div>


                            <div className="butt-container">
                                <button className={'border-button blue'}>Stake</button>
                            </div>
                        </form>
                        :
                        <form onSubmit={handleSend}>
                            <input
                                className={`input-gray send`}
                                type="text"
                                placeholder={`send to (0x address / receiver`}
                                value={to}
                                onChange={event => setTo(event.target.value)}
                            />

                            <div className="adk-value">
                                <input
                                    className={`input-gray`}
                                    type="text"
                                    placeholder={'0.00'}
                                    value={adkValue}
                                    onChange={event => setAdkValue(event.target.value)}
                                />
                                <div className="but-container">
                                    <button className={'all-send'}>All</button>
                                    <h3>ADK</h3>
                                </div>
                            </div>
                            <div className="container-usd">
                                <h3>0,00</h3>
                                <h3>USD</h3>
                            </div>
                            <p>Avaible: 0.0 ADK | Transaction fee: 0.021 ADK</p>

                            <p className={'radio-p'}>
                                <input type="radio" checked={checkValue === 1} onChange={() => setCheckValue(1)} />
                                <label htmlFor="answer1">Pay GAS (instant, 0.021 ADK fee)</label>
                            </p>

                            <p className={'radio-p'}>
                                <input type="radio" checked={checkValue === 2} onChange={() => setCheckValue(2)} />
                                <label htmlFor="answer2">Do proof to work (instant, 0 ADK fee)</label>
                            </p>

                            <div className="butt-container">
                                <button onClick={handleSend} className={`border-button`}>Send</button>
                            </div>
                        </form>
                }
            </div>
        </div>
    );
};

export default Send;