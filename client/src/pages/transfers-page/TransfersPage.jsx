import React, {useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import './TransfersPage.css';
import {passGLOBAL} from "../local-wallet-start/components/PasswordModal/PasswordModal";
import ModalTransfer from "./components/ModalTransfer/ModalTransfer";



const TransfersPage = () => {

    console.log("password: ",passGLOBAL)

    const [modalTransfer,setModalTransfer] = useState(false)


    useEffect(() =>{

    })

    return (
        <>
        <div className='transfer-page'>
            <div className="header-tp">
                <Button variant={"dark"}>Back</Button>
                <div className="right-container-tp">
                    <Button variant={"primary"}>reboot</Button>
                    <Button variant={"secondary"}>settings</Button>
                    <Button variant={"danger"}>sign out</Button>
                </div>
            </div>

            <div className="menu-tp">
                <div className="bal-stack-tp">
                    <div className="balance-tp">
                        <h3>Total balance</h3>
                        <h5></h5>
                    </div>

                    <div className="stacked-tp">
                        <h3>Total stacked</h3>
                    </div>
                </div>

                <div className="send-rec-tp">
                    <Button onClick={() => setModalTransfer(true)} variant={"dark"}>send</Button>
                    <Button variant={"outline-dark"}>receive</Button>
                </div>
            </div>
        </div>

            <ModalTransfer show={modalTransfer} onHide={() => setModalTransfer(false)} />
        </>
    );
};

export default TransfersPage;