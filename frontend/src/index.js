import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {createRoot} from 'react-dom/client';
import App from './components/App';
import './index.css';

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);