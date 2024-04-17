import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import { ThemeProviderWrapper } from "./context/theme.context";
import { AuthProviderWrapper } from './context/auth.context';

const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

const toggleDarkMode = (e) => {
  const darkModeOn = e.matches;
  if (darkModeOn) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
};


prefersDarkScheme.addListener(toggleDarkMode);


toggleDarkMode(prefersDarkScheme);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
     <AuthProviderWrapper>
      <ThemeProviderWrapper>
         <App />
       
      </ThemeProviderWrapper>
     </AuthProviderWrapper>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
