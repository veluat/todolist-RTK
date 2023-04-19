import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {App_training} from "./training/App_training";
import {createTheme, CssBaseline, ThemeProvider} from "@material-ui/core";
import {App} from "./app/App";
import {Provider} from "react-redux";
import {store} from "./app/store";
import { createRoot } from 'react-dom/client';

const theme = createTheme({
    palette: {
        primary: {
            main: '#9ccc65',
        },
        secondary: {
            main: '#ff7043',
        },
        type: "dark",
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
