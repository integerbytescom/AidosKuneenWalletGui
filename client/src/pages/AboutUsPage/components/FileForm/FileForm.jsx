import React,{useState} from 'react';
import {anFade, anFadeOut} from "../../../../animations";
import {Link, useLocation, useNavigate} from "react-router-dom";
import './FileForm.css';
import {checkLightTheme} from "../../../../lightThemeCheck";

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
        <div className={`block-container menu form ${fade} ${checkLightTheme()}`}>

            <span className={`links-top-about ${checkLightTheme()}`}>
                <Link to={'/wallet/aboutUs'} className={path==='/wallet/aboutUs'?'active':''}>Information</Link>
                <Link to={'/wallet/fileForm'} className={path==='/wallet/fileForm'?'active':''}>Bugs</Link>
            </span>

            <form className={`help-form file ${checkLightTheme()}`}>
                <h3>Describe the problem you have encountered</h3>
                <input className={`input-gray ${checkLightTheme()}`} type="text" placeholder={'Enter your name'}/>
                <input className={`input-gray ${checkLightTheme()}`} type="text" placeholder={'Enter your E-mail'}/>
                <p className={`form-text`}>The problem associated with sending coins</p>
                <textarea cols="30" rows="10" placeholder={'Describe your problem in detail'}></textarea>
                <span className={`input-file-span`}>
                    {checkLightTheme()?
                        <img src="./images/file-input-bl.svg" alt=""/>:
                        <img src="./images/file-input.svg" alt=""/>
                    }
                    <input className={`custom-file-input ${checkLightTheme()}`} type="file"/>
                </span>
                <button className="blue-button">Send File</button>
            </form>

        </div>
    );
};

export default FileForm;