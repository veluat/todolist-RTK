import React from 'react';
import type {Meta, StoryFn, StoryObj} from '@storybook/react';

import {App} from '../app/App';
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {ErrorSnackBar} from "../Components/ErrorSnackBar/ErrorSnackBar";
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

const meta: Meta<typeof App> = {
    component: App,
    title: 'TODOLISTS/App',
    decorators: [ReduxStoreProviderDecorator]
};
export default meta;

type Story = StoryObj<typeof App>;

export const AppExample: StoryFn = (args) => {
    return (
        <div>
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
            </AppBar>
            <Container fixed>
                <TodolistsList demo={true}/>
            </Container>
        </div>
    )
};