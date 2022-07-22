import React from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import PreviewPage from "./pages/PreviewPage/PreviewPage";
import AuthorizationPage from "./pages/ AuthorizationPage/ AuthorizationPage";
import NavbarLeft from "./general-components/NavbarLeft/NavbarLeft";
import CreateWalletPage from "./pages/CreateWalletPage/CreateWalletPage";
import ShowSeedPage from "./pages/ShowSeedPage/ShowSeedPage";
import ConfirmSeed from "./pages/ConfirmSeed/ConfirmSeed";
import ConfirmPassword from "./pages/ConfimPassword/ConfimPassword";
import WalletPage from "./pages/WalletPage/WalletPage";


const Router = () => {

    const path = useLocation().pathname;

    return (
        <div>
            {path==='/'?'':<NavbarLeft />}
            <Routes>
                <Route path='/' element={ <PreviewPage /> } />
                <Route path='/auth' element={ <AuthorizationPage /> } />
                <Route path='/createWallet' element={ <CreateWalletPage /> } />
                <Route path='/showSeed' element={ <ShowSeedPage /> } />
                <Route path='/confirmSeed' element={ <ConfirmSeed /> } />
                <Route path='/confirmPass' element={ <ConfirmPassword /> } />
                <Route path='/wallet' element={ <WalletPage /> } />
            </Routes>
        </div>
    );
};

export default Router;