import React,{useState} from 'react';
import './Send.css';
import {anFadeOut, anFade} from "../../../../animations";
import {useNavigate} from "react-router-dom";

const Send = () => {

    const navigate = useNavigate()

    const [fade,setFade] = useState(anFade)

    const handleCloseSend = () =>{
        setFade(anFadeOut)
        setTimeout(() => navigateRoute('/wallet'),1000)
    }
    const navigateRoute = (url) =>{
        navigate(url)
    }

    return (
        <div className={`send ${fade}`}>

            <button onClick={handleCloseSend} className={`close-button`}>
                <img src="./images/x.svg" alt="close"/>
            </button>

            <div className="send-content">
                <img src="./images/wallet-page/logoKrug.svg" alt="logoAidos"/>

                <form className="form-create-pass">
                    <div className="container-cp-inp">
                        <input type="text" placeholder={`send to (0x address / receiver`} />
                    </div>
                    <div className="container-cp-inp adk-value">
                        <input type="number" defaultValue={`0.00`} />
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
                        <button>Send</button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Send;