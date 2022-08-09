import React, {useState} from 'react';
import './Overview.css';
import OverviewGraph from "./components/OverviewGraph/OverviewGraph";
import {anFade} from "../../../../animations";
import {checkLightTheme} from "../../../../lightThemeCheck";

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
        <div className={`overview ${checkLightTheme()}`}>
            <div className={`value-change ${checkLightTheme()}`}>
                <h2>645$</h2>
                <h3>+0.065%</h3>
            </div>

            <div className="graph-container">
                <OverviewGraph data={data} />
            </div>
        </div>
    );
};

export default Overview;