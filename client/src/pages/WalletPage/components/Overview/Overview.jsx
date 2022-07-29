import React, {useState} from 'react';
import './Overview.css';
import OverviewGraph from "./components/OverviewGraph/OverviewGraph";
import {anFade} from "../../../../animations";

const data = [
    {
        day: "",
        adk: 300,
    },
    {
        day: "Jun, 19",
        adk: 200,
    },
    {
        day: "Jun, 27",
        adk: 700,
    },
    {
        day: "Jul, 6",
        adk: 400,
    },
    {
        day: "Jul, 12",
        adk: 150,
    },
    {
        day: "",
        adk: 500,
    },
];

const Overview = () => {

    const [fade,setFade] = useState(anFade)

    return (
        <div className={`block-container menu overview ${fade}`}>
            <div className="value-change">
                <div className="dollar">
                    <h2>645 $</h2>
                    <p>1 ADK</p>
                </div>
                <div className="change">
                    <h3>+0.065%</h3>
                    <p>24h change</p>
                </div>
            </div>

            <div className="graph-container">
                <OverviewGraph data={data} />
            </div>

            <div className="buttons-date">
                <button>1 D</button>
                <button>1 W</button>
                <button>1 M</button>
                <button>3 M</button>
                <button>6 M</button>
                <button>1 Y</button>
            </div>
        </div>
    );
};

export default Overview;