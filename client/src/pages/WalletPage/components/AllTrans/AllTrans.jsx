import React from 'react';
import './AllTrans.css';

const AllTrans = (props) => {

    return (
        <>
            {props.transactionsOnePage.map((trans,idx) => (
                <div className={'trans-container'} key={idx}>
                    <div className="from-to">
                        <div className="from">
                            <p style={{opacity:1,fontWeight:600}}>From</p>
                            <p>{trans.from}</p>
                        </div>
                        <div className="to">
                            <p style={{opacity:1,fontWeight:600}}>To</p>
                            <p className={props.blueClass}>{trans.to}</p>
                        </div>
                    </div>

                    <div className="dollar-adk">
                        <div className="dollar">
                            <h3>+ 587 $</h3>
                        </div>
                        <div className="adk">
                            {trans.adk.startsWith('+')?
                                <h3 className={`green ${props.blueClass}`}>{trans.adk}</h3>:
                                <h3 className={`red ${props.blueClass}`}>{trans.adk}</h3>
                            }
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default AllTrans;