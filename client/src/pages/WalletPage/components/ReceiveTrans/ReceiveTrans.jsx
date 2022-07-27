import React from 'react';
import './ReceiveTrans.css';

const ReceiveTrans = (props) => {
    return (
        <>
            {props.transactionsOnePage.map((trans,idx) => (
                <div className={'rec-trans-container'} key={idx}>
                    <p>{trans.from}</p>
                    <div className="money-container">
                        <h3 className={'dollar'}>587 $</h3>
                        <h3 className={'adk'}>{trans.adk.slice(1,trans.adk.length)}</h3>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ReceiveTrans;