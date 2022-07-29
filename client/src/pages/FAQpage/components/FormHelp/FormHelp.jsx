import React,{useState} from 'react';
import {anFade, anFadeOut} from "../../../../animations";
import {useNavigate} from "react-router-dom";
import './FormHelp.css';

const FormHelp = () => {

    const navigate = useNavigate()

    const [fade,setFade] = useState(anFade)

    const handleConfirmForm = (url) =>{
        setFade(anFadeOut)
        setTimeout(() => navigateRoute(url),600)
    }

    const navigateRoute = (url) =>{
        navigate(url)
    }

    return (
        <div className={`block-container menu ${fade}`}>

            <button onClick={() => handleConfirmForm('/wallet/FAQ')} className={`close-button ${fade}`}>
                <img src="./images/x.svg" alt=""/>
            </button>

            <form className={'help-form'}>
                <h3>Напишите нам</h3>
                <input className={'input-gray'} type="text" placeholder={'enter your name'}/>
                <input className={'input-gray'} type="text" placeholder={'enter email'}/>
                <textarea cols="30" rows="10" placeholder={'enter text'}></textarea>
                <button className="blue-button">Send</button>
            </form>

        </div>
    );
};

export default FormHelp;