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
import Send from "./pages/WalletPage/components/Send/Send";
import Receive from "./pages/WalletPage/components/Receive/Receive";
import RecoverSeed from "./pages/RecoverSeed/RecoverSeed";
import CreatePassword from "./pages/CreatePassword/CreatePassword";
import Overview from "./pages/WalletPage/components/Overview/Overview";
import Staking from "./pages/WalletPage/components/Staking/Staking";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage";
import FAQpage from "./pages/FAQpage/FAQpage";
import CalculatorPage from "./pages/CalculatorPage/CalculatorPage";
import FormHelp from "./pages/FAQpage/components/FormHelp/FormHelp";
import Settings from "./pages/Settings/Settings";
import LoadPage from "./pages/LoadPage/LoadPage";


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
                <Route path='/recoverSeed' element={ <RecoverSeed /> } />
                <Route path='/createPass' element={ <CreatePassword /> } />
                <Route path='/wallet' element={ <WalletPage /> } />
                <Route path='/wallet/send' element={ <Send /> } />
                <Route path='/wallet/receive' element={ <Receive /> } />
                <Route path='/wallet/overview' element={ <Overview /> } />
                <Route path='/wallet/staking' element={ <Staking /> } />
                <Route path='/wallet/stake' element={ <Send blue={'blue'} /> } />
                <Route path='/wallet/unstake' element={ <Send blue={'blue'} /> } />
                <Route path='/wallet/aboutUs' element={ <AboutUsPage /> } />
                <Route path='/wallet/calc' element={ <CalculatorPage /> } />
                <Route path='/connectMM/confirmPassword' element={ <ConfirmPassword path={'mm'} /> } />
                <Route path='/wallet/FAQ' element={ <FAQpage /> } />
                <Route path='/wallet/form' element={ <FormHelp /> } />
                <Route path='/wallet/settings' element={ <Settings /> } />
                <Route path='/loadPage' element={ <LoadPage /> } />
            </Routes>
        </div>
    );
};

export default Router;