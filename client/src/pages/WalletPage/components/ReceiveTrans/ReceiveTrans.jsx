import React from 'react';
import './ReceiveTrans.css';
import {checkLightTheme} from "../../../../lightThemeCheck";

const ReceiveTrans = (props) => {
    return (
        <>
            {props.transactionsOnePage.map((trans,idx) => (
                <div className={`rec-trans-container ${checkLightTheme()}`} key={idx}>
                    <span>
                        <p>{trans.from}</p>
                        {checkLightTheme()?
                            <img className={'copy-address'} src="./images/receive/copy-bl.svg" alt="copy"/>:
                            <img className={'copy-address'} src="./images/receive/copy.svg" alt="copy"/>
                        }
                    </span>

                    <h3 className={'adk'}>{trans.adk.slice(1,trans.adk.length)}</h3>
                </div>
            ))}
        </>
    );
};

export default ReceiveTrans;