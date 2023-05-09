import React from "react";
import './App.css';
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import LinearProgress from '@mui/material/LinearProgress';
import {ErrorSnackBar} from "../Components/ErrorSnackBar/ErrorSnackBar";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {RequestStatusType} from "./app-reducer";

export function App() {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    return (
        <div className="App">
            <ErrorSnackBar/>
            <AppBar position='static' enableColorOnDark>
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge='start' color='inherit' aria-label='menu'>
                        <Menu/>
                    </IconButton>
                    <Typography variant='h6' style={{fontWeight: 'bold'}}>
                        TO-DO LISTS
                    </Typography>
                    <Button color='inherit' variant='outlined'>Login</Button>
                </Toolbar>
                {status === 'loading' &&
                    <LinearProgress color="primary"
                                    style={{position: "absolute", right: "0", left: "0", top: "64px", bottom: "0"}}/>}
            </AppBar>
            <Container fixed>
                <TodolistsList/>
            </Container>
        </div>
    );
}

