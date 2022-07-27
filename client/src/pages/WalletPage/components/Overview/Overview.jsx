import React, {useState} from 'react';
import './Overview.css';
import OverviewGraph from "./components/OverviewGraph/OverviewGraph";
import {anFade} from "../../../../animations";

const Overview = () => {

    const [fade,setFade] = useState(anFade)

    return (
        <div className={`overview ${fade}`}>
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
                <OverviewGraph />
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