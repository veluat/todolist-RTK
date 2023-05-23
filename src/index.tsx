import React from 'react';
import './index.css';
import * as serviceWorker from './serviceWorker';
import CssBaseline from '@mui/material/CssBaseline';
import {Provider} from "react-redux";
import {store} from "./app/store";
import {createRoot} from 'react-dom/client';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {App} from "./app/App";
import {BrowserRouter} from "react-router-dom";

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#9c27b0',
        },

        mode: 'light',
    },
})
const container = document.getElementById('root') as HTMLElement
const root = createRoot(container!)

root.render(
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Provider store={store}>
                <App/>
            </Provider>
        </ThemeProvider>
    </BrowserRouter>);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
