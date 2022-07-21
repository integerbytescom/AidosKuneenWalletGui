import React from 'react';
import {Route,Routes} from "react-router-dom";
import PreviewPage from "./pages/PreviewPage/PreviewPage";
import AuthorizationPage from "./pages/ AuthorizationPage/ AuthorizationPage";


const Router = () => {

    return (
        <div>
            <Routes>
                <Route path='/' element={ <PreviewPage /> } />
                <Route path='/auth' element={ <AuthorizationPage /> } />
            </Routes>
        </div>
    );
};

export default Router;