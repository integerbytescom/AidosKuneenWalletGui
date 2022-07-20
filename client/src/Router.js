import React from 'react';
import {Route,Routes} from "react-router-dom";
import PreviewPage from "./pages/PreviewPage/PreviewPage";


const Router = () => {

    return (
        <div>
            <Routes>
                <Route path='/' element={ <PreviewPage /> } />
            </Routes>
        </div>
    );
};

export default Router;