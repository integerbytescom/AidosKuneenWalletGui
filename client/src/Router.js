import React from 'react';
import {Route,Routes} from "react-router-dom";
import PreviewPage from "./pages/preview-page/PreviewPage";
import ChoosePage from "./pages/choose-page/ChoosePage";
import LocalWalletStartPage from "./pages/local-wallet-start/LocalWalletStartPage";

const Router = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={ <PreviewPage /> } />
                <Route path='/choose' element={ <ChoosePage /> } />
                <Route path='/lwstart' element={ <LocalWalletStartPage /> } />
            </Routes>
        </div>
    );
};

export default Router;