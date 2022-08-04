import React, {useState} from 'react';
import {anFade} from "../../animations";
import './CalculatorPage.css';

const CalculatorPage = () => {

    const [fade,setFade] = useState(anFade)

    return (
        <div className={`calculator`}>
            <div className="calc-content">
                <img className={'dollar'} src="./images/calculator/dollar.svg" alt=""/>

                <>
                <input type="text" className="input-gray" placeholder={'0.00'}/>
                <select>
                    <option value={"USD"}>Dollars</option>
                    <option value={"RUB"}>Rubles</option>
                    <option value={"EUR"}>Euros</option>
                </select>
                </>

                <div className="money-container">
                    <h2>342,433.43 $</h2>
                </div>

                <button>Count up</button>
            </div>
        </div>
    );
};

export default CalculatorPage;