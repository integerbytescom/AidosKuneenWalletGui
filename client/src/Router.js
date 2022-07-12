import React from 'react';
import {Route,Routes} from "react-router-dom";
import PreviewPage from "./pages/preview-page/PreviewPage";
import ChoosePage from "./pages/choose-page/ChoosePage";
import LocalWalletStartPage from "./pages/local-wallet-start/LocalWalletStartPage";
import TransfersPage from "./pages/transfers-page/TransfersPage";
import {passGLOBAL} from "./pages/local-wallet-start/components/PasswordModal/PasswordModal";


const Router = () => {

    return (
        <div>
            <passGLOBAL>
            <Routes>
                <Route path='/' element={ <PreviewPage /> } />
                <Route path='/choose' element={ <ChoosePage /> } />
                <Route path='/lwstart' element={ <LocalWalletStartPage /> } />
                <Route path='/transfer' element={ <TransfersPage /> } />
            </Routes>
            </passGLOBAL>
        </div>
    );
};

export default Router;