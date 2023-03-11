import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {App} from "./App";
import {createTheme, CssBaseline, ThemeProvider} from "@material-ui/core";
import {AppWithReducers} from "./AppWithReducers";
import {AppWithRedux} from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./store/store";

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

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Provider store={store}>
            <AppWithRedux/>
        </Provider>
    </ThemeProvider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
