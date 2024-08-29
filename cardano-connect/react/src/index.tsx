import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from "./reportWebVitals";
import { MeshProvider } from "@meshsdk/react";
import { Connector } from "./components/Connector";
import { Assets } from "./components/Assets";
import { Balance } from "./components/Balance";
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, state } from './library/state'
import './app.css';
import {Message} from "./components/Message";

const connectorElements = document.getElementsByClassName('wp-block-cardano-connect-connector')
for (let i = 0; i < connectorElements.length; i++) {
    const connector = ReactDOM.createRoot(connectorElements[i]);
    connector.render(
        <React.StrictMode>
            <MeshProvider>
                <Provider store={state}>
                    <PersistGate persistor={persistor}>
                        <Connector />
                    </PersistGate>
                </Provider>
            </MeshProvider>
        </React.StrictMode>
    );
}

const assetsElements = document.getElementsByClassName('wp-block-cardano-connect-assets')
for (let i = 0; i < assetsElements.length; i++) {
    const assets = ReactDOM.createRoot(assetsElements[i])
    const perPage: number = assetsElements[i].getAttribute('data-perpage')
        ? parseInt(assetsElements[i].getAttribute('data-perpage'))
        : undefined
    const hideTitles: boolean = assetsElements[i].getAttribute('data-hide_titles')
        ? !!assetsElements[i].getAttribute('data-hide_titles')
        : undefined
    assets.render(
        <React.StrictMode>
            <MeshProvider>
                <Provider store={state}>
                    <PersistGate persistor={persistor}>
                        <Assets
                            perPage={perPage}
                            hideTitles={hideTitles}
                            whitelistString={assetsElements[i].getAttribute('data-whitelist')}
                        />
                    </PersistGate>
                </Provider>
            </MeshProvider>
        </React.StrictMode>
    );
}

const balanceElements = document.getElementsByClassName('wp-block-cardano-connect-balance')
for (let i = 0; i < balanceElements.length; i++) {
    const assets = ReactDOM.createRoot(balanceElements[i]);
    assets.render(
        <React.StrictMode>
            <MeshProvider>
                <Provider store={state}>
                    <PersistGate persistor={persistor}>
                        <Balance />
                    </PersistGate>
                </Provider>
            </MeshProvider>
        </React.StrictMode>
    );
}

const messageElement = document.createElement('div')
messageElement.id = 'wp-block-cardano-connect-message'
document.body.appendChild(messageElement)
const message = ReactDOM.createRoot(messageElement);
message.render(
    <React.StrictMode>
        <MeshProvider>
            <Provider store={state}>
                <PersistGate persistor={persistor}>
                    <Message />
                </PersistGate>
            </Provider>
        </MeshProvider>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
