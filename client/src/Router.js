import React, {useEffect, useState} from 'react';
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import AuthorizationPage from "./pages/AuthorizationPage/AuthorizationPage";
import NavbarLeft from "./general-components/NavbarLeft/NavbarLeft";
import CreateWalletPage from "./pages/CreateWalletPage/CreateWalletPage";
import ShowSeedPage from "./pages/ShowSeedPage/ShowSeedPage";
import ConfirmPassword from "./pages/ConfimPassword/ConfimPassword";
import WalletPage from "./pages/WalletPage/WalletPage";
import Send from "./pages/WalletPage/components/Send/Send";
import Receive from "./pages/WalletPage/components/Receive/Receive";
import RecoverSeed from "./pages/RecoverSeed/RecoverSeed";
import CreatePassword from "./pages/CreatePassword/CreatePassword";
import Staking from "./pages/WalletPage/components/Staking/Staking";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage";
import FAQpage from "./pages/FAQpage/FAQpage";
import FormHelp from "./pages/FAQpage/components/FormHelp/FormHelp";
import Settings from "./pages/Settings/Settings";
import LoadPage from "./general-components/LoadPage/LoadPage";
import { useIdleTimer } from 'react-idle-timer'
import WalletSuccess from "./pages/WalletSuccess/WalletSuccess";
import FileForm from "./pages/AboutUsPage/components/FileForm/FileForm";


const Router = () => {

    const path = useLocation().pathname;
    const navigate = useNavigate()

    //timer or check inaction user
    const handleOnIdle = () => {
        navigate('/loadPage')
    }
    const [lsSecur] = useState(window.localStorage.getItem('security') === 'true');
    const { getRemainingTime, getLastActiveTime } = useIdleTimer({
        timeout: lsSecur?(1000 * 60):(9999 * 9999 * 9999 * 9999),
        onIdle: handleOnIdle,
        debounce: 200
    })

    useEffect(() => {
        const getSecure = () =>{
            const lsNow = window.localStorage.getItem('security')
            if (lsNow === null){
                window.localStorage.setItem('security',true)
            }
        }
        getSecure()
        const getHints = () =>{
            const lsNow = window.localStorage.getItem('hints')
            if (lsNow === null){
                window.localStorage.setItem('hints',true)
            }
        }
        getHints()
    },[])

    return (
        <>
            {path==='/'?'':<NavbarLeft />}
            <Routes>
                <Route path='/' element={ <AuthorizationPage /> } />
                <Route path='/createWallet' element={ <CreateWalletPage /> } />
                <Route path='/showSeed' element={ <ShowSeedPage /> } />
                <Route path='/confirmPass' element={ <ConfirmPassword /> } />
                <Route path='/recoverSeed' element={ <RecoverSeed /> } />
                <Route path='/createPass' element={ <CreatePassword /> } />
                <Route path='/wallet' element={ <WalletPage /> } />
                <Route path='/wallet/send' element={ <Send /> } />
                <Route path='/wallet/receive' element={ <Receive /> } />
                <Route path='/wallet/staking' element={ <Staking /> } />
                <Route path='/wallet/stake' element={ <Send blue={'blue'} /> } />
                <Route path='/wallet/unstake' element={ <Send blue={'blue'} /> } />
                <Route path='/wallet/aboutUs' element={ <AboutUsPage /> } />
                <Route path='/connectMM/confirmPassword' element={ <ConfirmPassword path={'mm'} /> } />
                <Route path='/wallet/FAQ' element={ <FAQpage /> } />
                <Route path='/wallet/form' element={ <FormHelp /> } />
                <Route path='/wallet/settings' element={ <Settings /> } />
                <Route path='/loadPage' element={ <LoadPage /> } />
                <Route path='/localWalletSuccess' element={ <WalletSuccess /> } />
                <Route path='/wallet/fileForm' element={ <FileForm /> } />
            </Routes>
        </>
    );
};

export default Router;