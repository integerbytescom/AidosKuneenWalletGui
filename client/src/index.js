import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from "./Router";
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import {HashRouter} from "react-router-dom";
import 'animate.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <HashRouter>
      <React.StrictMode>
        <Router />
      </React.StrictMode>
    </HashRouter>
);

