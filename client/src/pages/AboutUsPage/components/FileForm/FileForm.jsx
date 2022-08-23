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
    const [subject,setSubject] = useState('')
    const [text,setText] = useState('')
    const [file,setFile] = useState('')

    //state for invalid input
    const [invalidInp,setInvalidInp] = useState(null)

    const [fade,setFade] = useState(anFade)

    const handleConfirmForm = async (e) =>{
        e.preventDefault()
        if (name===''){
            setInvalidInp(1)
        }else if(email===''){
            setInvalidInp(2)
        }else if(subject===''){
            setInvalidInp(3)
        }else if(text===''){
            setInvalidInp(4)
        }else {
            console.log(name,'name')
            console.log(email,'email')
            console.log(subject,'subject')
            console.log(text,'text')
            console.log(file,'file')
            const res = await window.walletAPI.sendEmail('maxim.shnyagin@gmail.com',name,email,text,file)
            console.log(res)
            setFade(anFadeOut)
            setTimeout(() => navigateRoute('/wallet'),600)
        }
    }

    const navigateRoute = (url) =>{
        navigate(url)
    }

    return (
        <div className={`block-container menu form ${fade} ${checkLightTheme()}`}>

            {/*<span className={`links-top-about ${checkLightTheme()}`}>*/}
            {/*    <Link to={'/wallet/aboutUs'} className={path==='/wallet/aboutUs'?'active':''}>Information</Link>*/}
            {/*    <Link to={'/wallet/fileForm'} className={path==='/wallet/fileForm'?'active':''}>Bugs</Link>*/}
            {/*</span>*/}

            <form onSubmit={handleConfirmForm} className={`help-form file ${checkLightTheme()}`}>
                <h3>Bug Reporting Form</h3>

                <input
                    className={`input-gray ${checkLightTheme()} ${invalidInp===1?'invalid':''}`}
                    type="text"
                    placeholder={'Enter your name'}
                    value={name}
                    onChange={event => setName(event.target.value)}
                />

                <input
                    className={`input-gray ${checkLightTheme()} ${invalidInp===2?'invalid':''}`}
                    type="text"
                    placeholder={'Enter your E-mail'}
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />

                <input
                    style={{marginBottom:15}}
                    className={`input-gray ${checkLightTheme()} ${invalidInp===3?'invalid':''}`}
                    type="text"
                    placeholder={'Subject'}
                    value={subject}
                    onChange={event => setSubject(event.target.value)}
                />

                <textarea
                    className={`${invalidInp===4?'invalid':''}`}
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
                    <p className={'file-p'}>{file.slice(String(file).lastIndexOf("\\")+1,file.length)}</p>
                </span>
                <button type={"submit"} className="blue-button">Send</button>
            </form>

        </div>
    );
};

export default FileForm;