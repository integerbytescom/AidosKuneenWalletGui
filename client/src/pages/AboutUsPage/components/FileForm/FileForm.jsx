import React,{useState} from 'react';
import {anFade, anFadeOut} from "../../../../animations";
import {Link, useLocation, useNavigate} from "react-router-dom";
import './FileForm.css';

const FileForm = () => {

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

            <span className={'links-top-about'}>
                <Link to={'/wallet/aboutUs'} className={path==='/wallet/aboutUs'?'active':''}>Information</Link>
                <Link to={'/wallet/fileForm'} className={path==='/wallet/fileForm'?'active':''}>Bugs</Link>
            </span>

            <form className={'help-form file'}>
                <h3>Describe the problem you have encountered</h3>
                <input className={'input-gray'} type="text" placeholder={'Enter your name'}/>
                <input className={'input-gray'} type="text" placeholder={'Enter your E-mail'}/>
                <p className={`form-text`}>The problem associated with sending coins</p>
                <textarea cols="30" rows="10" placeholder={'Describe your problem in detail'}></textarea>
                <span className={'input-file-span'}>
                    <img src="./images/file-input.svg" alt=""/>
                    <input className="custom-file-input" type="file"/>
                </span>
                <button className="blue-button">Send File</button>
            </form>

        </div>
    );
};

export default FileForm;