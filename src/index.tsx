import React from 'react';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {App} from "./app/App";
import {Provider} from "react-redux";
import {store} from "./app/store";
import {createRoot} from 'react-dom/client';
import {lightGreen} from "@mui/material/colors";

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
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Provider store={store}>
            <App/>
        </Provider>
    </ThemeProvider>);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
