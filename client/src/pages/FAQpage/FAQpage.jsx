import React, {useState} from 'react';
import './FAQpage.css';
import {anFade, anFadeOut} from "../../animations";
import {useNavigate} from "react-router-dom";

const FAQpage = () => {

    const navigate = useNavigate()

    const [fade,setFade] = useState(anFade)

    const handleOpenForm = () =>{
        setFade(anFadeOut)
        setTimeout(routeForm,800)
    }
    const routeForm = () =>{
        navigate('/wallet/form')
    }

    const arrVideos = ['FpECoxsAKc8','38bWstAwpew','nIE0mIzzNHo','ttjXBwLdLv8','BVHHyH3G1Os'];

    return (
        <div className={`block-container menu faq-page ${fade}`}>
            <h1>Aidos Kuneen Help Videos</h1>
            <div className="video-container">
                {arrVideos.map(url => (
                    <iframe
                        key={url}
                        src={`https://www.youtube.com/embed/${url}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                    />
                ))}
            </div>
            <p className={'faq-bottom-text'}>Остались вопросы - <button onClick={handleOpenForm}>напишите нам</button></p>
        </div>
    );
};

export default FAQpage;