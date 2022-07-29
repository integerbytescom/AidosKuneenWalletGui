import React,{useState} from 'react';
import './LoadPage.css';
import {useNavigate} from "react-router-dom";
import {anFade, anFadeOut} from "../../animations";
import {Area, AreaChart, CartesianGrid, XAxis, YAxis} from "recharts";

const LoadPage = () => {

    const data = [
        {
            day: "",
            adk: 900,
        },
        {
            day: "Jun, 19",
            adk: 100,
        },
        {
            day: "Jun, 27",
            adk: 760,
        },
        {
            day: "Jul, 6",
            adk: 220,
        },
        {
            day: "Jul, 12",
            adk: 320,
        },
        {
            day: "",
            adk: 1000,
        },
    ];

    const navigate = useNavigate()

    const [fade,setFade] = useState(anFade)

    const handleConfirmSeed = (url,event) =>{
        event.preventDefault()
        setFade(anFadeOut)
        setTimeout(() => navigateRoute(url),1000)
    }

    const navigateRoute = (url) =>{
        navigate(url)
    }

    return (
        <div className={`block-container load-page ${fade}`}>
            <button onClick={event => handleConfirmSeed('/auth',event)} className={`close-button ${fade}`}>
                <img src="./images/x.svg" alt=""/>
            </button>

            <header>
                <div className="monetka">
                    <img src="./images/load-page/bitc.svg" alt=""/>
                    <span>
                        <h1 className="name">Bitcoin</h1>
                        <h3 className="sokr">BTC</h3>
                    </span>
                </div>

                <div className="about-changes">
                    <div className="a-c-container">
                        <p>Price</p>
                        <h2>$22,342.456</h2>
                    </div>
                    <div className="a-c-container">
                        <p>24h change</p>
                        <h2 className={`color`}>+4,53%</h2>
                    </div>
                    <div className="a-c-container">
                        <p>Market cap</p>
                        <h2>$453B</h2>
                    </div>
                    <div className="a-c-container">
                        <p>24h vol</p>
                        <h2>$45.3B</h2>
                    </div>
                </div>
            </header>
            <div className="graph-load-page">
                <AreaChart
                    className={`graph-overview`}
                    width={950}
                    height={250}
                    data={data}
                    margin={{
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 0
                    }}
                >
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="rgba(245, 179, 0, 0.29)" stopOpacity={0.8}/>
                            <stop offset="100%" stopColor="rgba(245, 179, 0, 0)" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid stroke="var(--color-white-opac-3)" vertical={false} />
                    <XAxis dataKey="day" />
                    <YAxis />
                    {/*<Tooltip />*/}
                    <Area type="monotone" dataKey="adk" stroke="#F5B300" fillOpacity={1} fill="url(#colorUv)" />
                </AreaChart>
            </div>

        </div>
    );
};

export default LoadPage;