import React,{useState} from 'react';
import './CreatePassword.css';
import {useNavigate} from "react-router-dom";
import {anFade, anFadeLeftOut, anFadeOut, anFadeRight} from "../../animations";

const CreatePassword = () => {

    const navigate = useNavigate()

    const [fade,setFade] = useState(anFade)
    const [fadeLeft,setFadeLeft] = useState(anFadeRight)

    const handleCreatePass = (url,event) =>{
        event.preventDefault()
        setFade(anFadeOut)
        setFadeLeft(anFadeLeftOut)
        setTimeout(() => navigateRoute(url),1000)
    }

    const navigateRoute = (url) =>{
        navigate(url)
    }

    return (
            <div className={`block-container menu`}>
                <button onClick={event => handleCreatePass('/auth',event)} className={`close-button ${fade}`}>
                    <img src="./images/x.svg" alt=""/>
                </button>

                <div className={`create-pass-container ${fadeLeft}`}>
                    <h2>Create password</h2>
                    <form className="form-create-pass">
                        <input className={`input-gray`} type="password" placeholder={`create password`} />

                        <input className={`input-gray`} type="password" placeholder={`insert again`} />

                        <button className={'blue-button'} onClick={event => handleCreatePass('/wallet',event)}>
                            Create
                        </button>
                    </form>
                </div>
            </div>
    );
};

export default CreatePassword;