import React from 'react';
import './AllTrans.css';

const AllTrans = (props) => {

    return (
        <>
            {
                props.stakeTr[0]===null?'':
                    props.stakeTr.map((trans,idx) => (
                        <div className={'trans-container'} key={idx}>
                            <div style={{justifyContent:'flex-start'}} className="from-to">
                                <div className="from">
                                    <p style={{opacity:1,fontWeight:600}}>From/To</p>
                                    <p>{trans.adress}</p>
                                </div>
                            </div>

                            <div className="dollar-adk">
                                <div className="adk">
                                    <h3 className={`${props.blueClass}`}>{trans.adk}ADK</h3>
                                </div>

                                <div className="conf-pend">
                                    <p>{trans.method}</p>
                                </div>
                            </div>
                        </div>
                    ))
            }
        </>
    );
};

export default AllTrans;