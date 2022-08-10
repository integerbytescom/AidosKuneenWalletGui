import React, {useEffect, useState} from 'react';
import {Alert} from "react-bootstrap";
import './Hints.css';
import {anFade, anFade1s, anFade2sSlow} from "../../animations";

const Hints = () => {

    const [showHints,setShowHints] = useState(true);

    const data = [
        'На главной странице кошелька вы можете увидеть график изменения стоимости монетки, калькулятор и баланс кошелька.',
        'С помощью калькулятора вы можете посмотреть стоимость определенного количества монеток в разных валютах.',
        'Также в верхней части экрана расположены две кнопки которые ведут на страницы Send и Deposit',
        'Нажав на кнопку Show all ы можете увидеть последние транзакции вашего кошелька',
    ];

    const [indMess,setIndMess] = useState(0)
    const [mess,setMess] = useState(data[indMess])

    useEffect(() =>{
        const nextMessage = (value) =>{
            if (value>=data.length){
                value=0
            }
            setMess(data[value])
            setTimeout(() => nextMessage(value+1), 10000)
        }
        nextMessage(0)
    },[])

    return (
        <Alert show={showHints} className={`hints-block ${anFade2sSlow}`} variant={`info`}>
           <div className="content">
               <img onClick={() => setShowHints(false)} src="./images/x-hints.svg" alt=""/>
                <p className={`message`}>
                    {mess}
                </p>
               <button>Don't show hints</button>
           </div>
        </Alert>
    );
};

export default Hints;