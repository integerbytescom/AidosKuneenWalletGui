import React from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import PreviewPage from "./pages/PreviewPage/PreviewPage";
import AuthorizationPage from "./pages/ AuthorizationPage/ AuthorizationPage";
import NavbarLeft from "./general-components/NavbarLeft/NavbarLeft";


const Router = () => {

    const path = useLocation().pathname;

    return (
        <div>
            {path==='/'?'':<NavbarLeft />}
            <Routes>
                <Route path='/' element={ <PreviewPage /> } />
                <Route path='/auth' element={ <AuthorizationPage /> } />
            </Routes>
        </div>
    );
};

export default Router;