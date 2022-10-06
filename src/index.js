import React from 'react';
import ReactDOM from 'react-dom/client';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from "./styles/theme";

import { BrowserRouter } from "react-router-dom";

import App from './App';
import { PublicClientApplication, EventType } from '@azure/msal-browser';

const pca = new PublicClientApplication({
    auth: {
        clientId: '087b2d94-92c8-468b-b54c-6a23ae5e3385',
        authority: 'https://login.microsoftonline.com/4d83e0d3-fe92-4c36-9c19-5c0dc4bff107',
        redirectUri: '/',
        postLogoutRedirectUri: '/',
        clientCapabilities: ['CP1']
    },
    cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: false
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPII) => {
                console.log(message)
            },
            logLevel: "Info"
        }
    }
});

pca.addEventCallback(event => {
    if (event.eventType === EventType.LOGIN_SUCCESS) {
        console.log(event);
        pca.setActiveAccount(event.payload.account);
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <App msalInstance={pca} />
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);
