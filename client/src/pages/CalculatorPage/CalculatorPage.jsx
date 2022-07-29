import React, {useState} from 'react';
import {anFade} from "../../animations";
import './CalculatorPage.css';

const CalculatorPage = () => {

    const [fade,setFade] = useState(anFade)

    return (
        <div style={{backgroundImage:`url('./images/auth-page/waves-height.svg')`}} className={`block-container bottom-waves ${fade}`}>
            <div className={`block-container menu`}>

                <div className="calc-content">
                    <img className={'dollar'} src="./images/calculator/dollar.svg" alt=""/>

                    <input type="text" className="input-gray" placeholder={'0.00'}/>

                    <select>
                        <option>Dollars</option>
                        <option>Rubles</option>
                        <option>Euros</option>
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