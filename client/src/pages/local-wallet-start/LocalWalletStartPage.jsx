import React,{useState} from 'react';
import './LocalWalletStartPage.css';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import CreateModal from "./components/CreateModal/CreateModal";
import RecoverModal from "./components/RecoverModal/RecoverModal";

const LocalWalletStartPage = () => {

    const [createModalShow, setCreateModalShow] = useState(false);
    const [recoverModalShow, setRecoverModalShow] = useState(false);

    return (
        <div className='block-container'>
            <Link className='link-back-lw' to='/choose'>Back</Link>

            <Button variant="primary" onClick={() => setCreateModalShow(true)}>
                CREATE
            </Button>
            <CreateModal
                show={createModalShow}
                onHide={() => setCreateModalShow(false)}
            />

            <Button variant="primary" style={{marginLeft:"20px"}} onClick={() => setRecoverModalShow(true)}>
                RECOVER WALLET
            </Button>
            <RecoverModal
                show={recoverModalShow}
                onHide={() => setRecoverModalShow(false)}
            />
        </div>
    );
};

export default LocalWalletStartPage;