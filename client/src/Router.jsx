import React from 'react';
import {Route, Routes} from "react-router-dom";
import PreviewPage from "./pages/previewPage/PreviewPage";
import ChooseWalletPage from "./pages/chooseWalletPage/ChooseWalletPage";

const Router = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<PreviewPage />} />
                <Route path="/choose" element={<ChooseWalletPage />} />
            </Routes>
        </div>
    );
};

export default Router;