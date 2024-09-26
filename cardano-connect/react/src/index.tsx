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
import {AssetModal} from "./components/AssetModal";
import {Pools} from "./components/Pools";
import 'react-tooltip/dist/react-tooltip.css'
import {CompareModal} from "./components/CompareModal";
import {Dreps} from "./components/Dreps";

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
    const perPage: number = assetsElements[i].getAttribute('data-per_page')
        ? parseInt(assetsElements[i].getAttribute('data-per_page'))
        : undefined
    const hideTitles: boolean = assetsElements[i].getAttribute('data-hide_titles')
        ? !!assetsElements[i].getAttribute('data-hide_titles')
        : undefined
    const notFound: string = assetsElements[i].getAttribute('data-not_found')
        ? assetsElements[i].getAttribute('data-not_found')
        : undefined
    assets.render(
        <React.StrictMode>
            <MeshProvider>
                <Provider store={state}>
                    <PersistGate persistor={persistor}>
                        <Assets
                            perPage={perPage}
                            hideTitles={hideTitles}
                            notFound={notFound}
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

const poolsElements = document.getElementsByClassName('wp-block-cardano-connect-pools')
for (let i = 0; i < poolsElements.length; i++) {
    const pools = ReactDOM.createRoot(poolsElements[i]);
    const perPage: number = poolsElements[i].getAttribute('data-per_page')
        ? parseInt(poolsElements[i].getAttribute('data-per_page'))
        : undefined
    const notFound: string = poolsElements[i].getAttribute('data-not_found')
        ? poolsElements[i].getAttribute('data-not_found')
        : undefined
    pools.render(
        <React.StrictMode>
            <MeshProvider>
                <Provider store={state}>
                    <PersistGate persistor={persistor}>
                        <Pools
                            perPage={perPage}
                            notFound={notFound}
                            whitelistString={poolsElements[i].getAttribute('data-whitelist')}
                        />
                    </PersistGate>
                </Provider>
            </MeshProvider>
        </React.StrictMode>
    );
}

const drepsElements = document.getElementsByClassName('wp-block-cardano-connect-dreps')
for (let i = 0; i < drepsElements.length; i++) {
    const pools = ReactDOM.createRoot(drepsElements[i]);
    const perPage: number = drepsElements[i].getAttribute('data-per_page')
        ? parseInt(drepsElements[i].getAttribute('data-per_page'))
        : undefined
    const notFound: string = drepsElements[i].getAttribute('data-not_found')
        ? drepsElements[i].getAttribute('data-not_found')
        : undefined
    pools.render(
        <React.StrictMode>
            <MeshProvider>
                <Provider store={state}>
                    <PersistGate persistor={persistor}>
                        <Dreps
                            perPage={perPage}
                            notFound={notFound}
                            whitelistString={drepsElements[i].getAttribute('data-whitelist')}
                        />
                    </PersistGate>
                </Provider>
            </MeshProvider>
        </React.StrictMode>
    );
}

const globalElement = document.createElement('div')
globalElement.id = 'wp-block-cardano-connect-global'
document.body.appendChild(globalElement)
const message = ReactDOM.createRoot(globalElement);
message.render(
    <React.StrictMode>
        <MeshProvider>
            <Provider store={state}>
                <PersistGate persistor={persistor}>
                    <Message />
                    <AssetModal />
                    <CompareModal />
                </PersistGate>
            </Provider>
        </MeshProvider>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
