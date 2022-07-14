import React,{useState} from 'react';
import './LocalWalletStartPage.css';
// import {Link} from "react-router-dom";
import CreateModal from "./components/CreateModal/CreateModal";
import RecoverModal from "./components/RecoverModal/RecoverModal";
import {anFade, anFade1s, anFade500ms} from "../../animations";

const LocalWalletStartPage = () => {

    //modals state
    const [createModalShow, setCreateModalShow] = useState(false);
    const [recoverModalShow, setRecoverModalShow] = useState(false);

    //anim states
    // const [] = useState()

    return (
        <div className='block-container lw-start-page'>

            <img className={`shape-lw ${anFade}`} src="./images/lw-start-page/shape-lw.svg" alt=""/>
            {/*<Link className={`link-back-lw`} to='/choose'>Back</Link>*/}

            <div className="lw-start-page-content">
                <h2 className={`${anFade}`}>Welcome to Aidos Kuneen </h2>

                <p className={`${anFade500ms}`}>
                    The technology stack of Aidos enables users to spend their tokens freely
                    without any fear of being tracked or tainted. Even though the design
                    differs from existing heavy and complex blockchain like Bitcoin and
                    other crypto-currencies, Aidos still remains the core principles of
                    openness, decentralization and improved privacy. Aidos will also
                    be ready to be used with and plugged into Internet of Things,
                    enabling participation in an ecosystem of billions of devices.
                </p>

                <div className="link-container">
                    <a className={`create-lw ${anFade1s}`} onClick={() => setCreateModalShow(true)}>
                        CREATE
                    </a>
                </div>

                <div className="link-container">
                    <a className={`recover-lw ${anFade1s}`} onClick={() => setRecoverModalShow(true)}>
                        RECOVER WALLET
                    </a>
                </div>
            </div>

            {/*modals start*/}
            <CreateModal
                show={createModalShow}
                onHide={() => setCreateModalShow(false)}
            />
            <RecoverModal
                show={recoverModalShow}
                onHide={() => setRecoverModalShow(false)}
            />
            {/*modals end*/}
        </div>
    );
};

export default LocalWalletStartPage;