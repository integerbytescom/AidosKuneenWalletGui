import React,{useState} from 'react';
import './CreatePassword.css';
import {useNavigate} from "react-router-dom";
import {anFade, anFadeLeft, anFadeLeftOut, anFadeOut} from "../../animations";

const CreatePassword = () => {

    const navigate = useNavigate()

    const [fade,setFade] = useState(anFade)
    const [fadeLeft,setFadeLeft] = useState(anFadeLeft)

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
        <div className={`create-password`}>
            <div className={`block-container`}>
                <button onClick={event => handleCreatePass('/auth',event)} className={`close-button ${fade}`}>
                    <img src="./images/x.svg" alt=""/>
                </button>

                <div className={`form-pass-container ${fadeLeft}`}>
                    <h2>Create password</h2>
                    <form className="form-create-pass">
                        <div className="container-cp-inp">
                            <input type="password" placeholder={`create password`} />
                        </div>

                        <div className="container-cp-inp">
                            <input type="password" placeholder={`insert again`} />
                        </div>

                        <button className={'dark'} onClick={event => handleCreatePass('/wallet',event)}>
                            Create
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreatePassword;