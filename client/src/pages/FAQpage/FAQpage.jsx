import React, {useState} from 'react';
import './FAQpage.css';
import {anFade} from "../../animations";

const FAQpage = () => {

    const [fade,unFade] = useState(anFade)

    const arrVideos = ['FpECoxsAKc8','38bWstAwpew','nIE0mIzzNHo','ttjXBwLdLv8','BVHHyH3G1Os'];

    return (
        <div className={`faq-page ${fade}`}>
            <h1>F.A.Q.</h1>
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
        </div>
    );
};

export default FAQpage;