import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { StoreProvider } from './hooks/useGlobalReducer';

const Main = () => {
    return (
        <React.StrictMode>
            <StoreProvider>
                <RouterProvider router={router} />
            </StoreProvider>
        </React.StrictMode>
    );
};

const container = document.getElementById('root');

// Check if root already exists on window (for hot reloads)
if (!window._reactRoot) {
    window._reactRoot = ReactDOM.createRoot(container);
}

window._reactRoot.render(<Main />);
