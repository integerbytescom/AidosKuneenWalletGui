import React,{useState} from 'react';
import {anFade, anFadeOut} from "../../../../animations";
import {Link, useLocation, useNavigate} from "react-router-dom";
import './FileForm.css';
import {checkLightTheme} from "../../../../lightThemeCheck";

const FileForm = () => {

    const navigate = useNavigate()
    const path = useLocation().pathname;

    //states for form
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [text,setText] = useState('')
    const [file,setFile] = useState('')

    const [fade,setFade] = useState(anFade)

    const handleConfirmForm = (e) =>{
        // setFade(anFadeOut)
        // setTimeout(() => navigateRoute(url),600)
        e.preventDefault()
        console.log(name)
        console.log(email)
        console.log(text)
        console.log(file)
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

            <form onSubmit={handleConfirmForm} className={`help-form file ${checkLightTheme()}`}>
                <h3>Describe the problem you have encountered</h3>

                <input
                    className={`input-gray ${checkLightTheme()}`}
                    type="text"
                    placeholder={'Enter your name'}
                    value={name}
                    onChange={event => setName(event.target.value)}
                />

                <input
                    className={`input-gray ${checkLightTheme()}`}
                    type="text"
                    placeholder={'Enter your E-mail'}
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />

                <p className={`form-text`}>The problem associated with sending coins</p>
                <textarea
                    cols="30"
                    rows="10"
                    placeholder={'Describe your problem in detail'}
                    value={text}
                    onChange={event => setText(event.target.value)}
                />

                <span className={`input-file-span`}>
                    {checkLightTheme()?
                        <img src="./images/file-input-bl.svg" alt=""/>:
                        <img src="./images/file-input.svg" alt=""/>
                    }
                    <input
                        className={`custom-file-input ${checkLightTheme()}`}
                        type="file"
                        value={file}
                        onChange={event => setFile(event.target.value)}
                    />
                </span>
                <button type={"submit"} className="blue-button">Send File</button>
            </form>

        </div>
    );
};

export default FileForm;