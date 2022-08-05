import React from 'react';
import './ReceiveTrans.css';

const ReceiveTrans = (props) => {
    return (
        <>
            {props.transactionsOnePage.map((trans,idx) => (
                <div className={'rec-trans-container'} key={idx}>
                    <span>
                        <p>{trans.from}</p>
                        <img className={'copy-address'} src="./images/receive/copy.svg" alt="copy"/>
                    </span>

                    <h3 className={'adk'}>{trans.adk.slice(1,trans.adk.length)}</h3>
                </div>
            ))}
        </>
    );
};

export default ReceiveTrans;