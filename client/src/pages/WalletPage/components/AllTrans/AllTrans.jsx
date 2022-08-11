import React from 'react';
import './AllTrans.css';
import sendTrans from "../../../../sendTrans";
import {useLocation} from "react-router-dom";

const AllTrans = (props) => {

    const path = useLocation().pathname;

    return (
        <>
            {path==='/wallet'?
            sendTrans('send')[0]===null?'':
                sendTrans('send').map((trans,idx) => (
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
                        <div className="adk">
                            {trans.adk.startsWith('+')?
                                <h3 className={`green ${props.blueClass}`}>{trans.adk}ADK</h3>:
                                <h3 className={`red ${props.blueClass}`}>{trans.adk}ADK</h3>
                            }
                        </div>

                        <div className="conf-pend">
                            <p>Confirmed</p>
                        </div>
                    </div>
                </div>
            )):
                sendTrans('stake')[0]===null?'':
                    sendTrans('stake').map((trans,idx) => (
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