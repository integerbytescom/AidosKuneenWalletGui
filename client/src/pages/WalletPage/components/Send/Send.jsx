import React,{useState} from 'react';
import './Send.css';
import {anFadeOut, anFade} from "../../../../animations";
import {useNavigate} from "react-router-dom";

const Send = (props) => {

    const navigate = useNavigate()

    const [fade,setFade] = useState(anFade)

    const handleCloseSend = () =>{
        setFade(anFadeOut)
        if (props.blue){
            setTimeout(() => navigateRoute('/wallet/staking'),1000)
        }else {
            setTimeout(() => navigateRoute('/wallet'),1000)
        }
    }
    const navigateRoute = (url) =>{
        navigate(url)
    }

    return (
        <div className={`block-container menu ${fade}`}>

            <button onClick={handleCloseSend} className={`close-button`}>
                <img src="./images/x.svg" alt="close"/>
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
                                <input className='input-gray blue' type="number" placeholder={`0.00`} />
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
                        <form>
                            <input className={`input-gray send`} type="text" placeholder={`send to (0x address / receiver`} />

                            <div className="adk-value">
                                <input className={`input-gray`} type="number" placeholder={'0.00'} />
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
                                <input type="radio" name="radio1" id="answer1" value="yes" />
                                <label htmlFor="answer1">Pay GAS (instant, 0.021 ADK fee)</label>
                            </p>

                            <p className={'radio-p'}>
                                <input type="radio" name="radio1" id="answer2" value="no" />
                                <label htmlFor="answer2">Do proof to work (instant, 0 ADK fee)</label>
                            </p>

                            <div className="butt-container">
                                <button className={`border-button`}>Send</button>
                            </div>
                        </form>
                }
            </div>
        </div>
    );
};

export default Send;