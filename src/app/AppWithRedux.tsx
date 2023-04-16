import React, {useCallback, useEffect} from "react";
import './App.css';
import {AddItemForm} from "../Components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC, addTodolistTC, fetchTodolistsTC, TodolistDomainType,
} from "../store/todolists-reducer";
import {useAppDispatch, useAppSelector} from "../store/store";
import {TodoListWithRedux} from "../Components/TodoListWithRedux/TodoListWithRedux";

export function AppWithRedux() {

    const todoLists = useAppSelector<TodolistDomainType[]>(state => state.todolists)

    const dispatch = useAppDispatch()

     useEffect(() => {
         dispatch(fetchTodolistsTC())
     }, [])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])


    const todoListComponents = todoLists.length
        ? todoLists.map(tl => {
                return (
                    <Grid item key={tl.id}>
                        <Paper elevation={8} style={{padding: '20px'}}>
                            <TodoListWithRedux
                                todoListId={tl.id}
                                title={tl.title}
                                filter={tl.filter}
                            />
                        </Paper>
                    </Grid>
                )
            }
        )
        : <span style={{padding: '20px'}}>Create your first todoList!</span>

    return (
        <div className="App">
            <AppBar position='static'>
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge='start' color='inherit' aria-label='menu'>
                        <Menu/>
                    </IconButton>
                    <Typography variant='h6'>
                        Todolist
                    </Typography>
                    <Button color='inherit' variant='outlined'>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed style={{paddingTop: '20px'}}>
                <Grid container style={{padding: '0 0 20px 0'}}>
                    <AddItemForm
                        addItem={addTodoList}
                        placeholder={'add new todoList'}
                    />
                </Grid>
                <Grid container spacing={3}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    );
}

