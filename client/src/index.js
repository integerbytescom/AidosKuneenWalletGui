import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from "./Router";
import {BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import 'animate.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
  </React.StrictMode>
);

