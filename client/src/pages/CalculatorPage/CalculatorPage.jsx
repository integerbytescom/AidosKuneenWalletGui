import React, {useState} from 'react';
import {anFade} from "../../animations";
import './CalculatorPage.css';

const CalculatorPage = () => {

    const [fade,setFade] = useState(anFade)

    // текущая выбранная валюта в селекте
    const [currency, setCurrency] = useState("USD")

    const handleSelect = (evt) => {
        setCurrency(evt.target.value)
    }

    // запрашиваем курс на бэке
    const requestСourse = () => {
        const resp = window.walletAPI.getAdkPrices()
    }

    return (
        <div style={{backgroundImage:`url('./images/auth-page/waves-height.svg')`}} className={`block-container bottom-waves ${fade}`}>
            <div className={`block-container menu`}>

                <div className="calc-content">
                    <img className={'dollar'} src="./images/calculator/dollar.svg" alt=""/>

                    <input type="text" className="input-gray" placeholder={'0.00'}/>

                    <select value={currency} onSelect={handleSelect}>
                        <option value={"USD"}>Dollars</option>
                        <option value={"RUB"}>Rubles</option>
                        <option value={"EUR"}>Euros</option>
                    </select>

                    <div className="money-container">
                        <h2>342,433.43 $</h2>
                    </div>

                    <button className={'border-button'}>Count up</button>
                </div>

            </div>
        </div>
    );
};

export default CalculatorPage;