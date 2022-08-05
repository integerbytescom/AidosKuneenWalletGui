import React,{useState} from 'react';
import {anFade, anFadeOut} from "../../../../animations";
import {Link, useLocation, useNavigate} from "react-router-dom";
import './FormHelp.css';

const FormHelp = () => {

    const navigate = useNavigate()

    const path = useLocation().pathname;

    const [fade,setFade] = useState(anFade)

    const handleConfirmForm = (url) =>{
        setFade(anFadeOut)
        setTimeout(() => navigateRoute(url),600)
    }

    const navigateRoute = (url) =>{
        navigate(url)
    }

    return (
        <div className={`block-container menu form ${fade}`}>

            <form className={'help-form'}>
                <h3>Describe the problem you have encountered</h3>
                <input className={'input-gray'} type="text" placeholder={'Enter your name'}/>
                <input className={'input-gray'} type="text" placeholder={'Enter your E-mail'}/>
                <p className={`form-text`}>The problem associated with sending coins</p>
                <textarea cols="30" rows="10" placeholder={'Describe your problem in detail'}></textarea>
                <button className="blue-button">Send</button>
            </form>

            <div className={'faq-bottom-text'}>
                <Link to={'/wallet/FAQ'} className={path==='/wallet/FAQ'?'active':''}>Questions</Link>
                <Link to={'/wallet/form'} className={path==='/wallet/form'?'active':''}>Feedback form</Link>
            </div>

        </div>
    );
};

export default FormHelp;