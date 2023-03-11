import React from "react";
import './App.css';
import {TasksType, TodoList} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeTodoListFilterAT,
    ChangeTodoListTitleAT,
    RemoveTodoListAC
} from "./store/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC
} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {TodoListType} from "./App";
import {TodoListWithRedux} from "./TodoListWithRedux";


export type FilterButtonType = 'All' | 'Active' | 'Completed'
export type TasksStateType = {
    [todoListId: string]: Array<TasksType>
}

export function AppWithRedux() {

    const todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todolists)

    //const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    /* const removeTask = (taskId: string, todoListId: string) => {
         dispatch(removeTaskAC(taskId, todoListId))
     }

     const addTask = (title: string, todoListId: string) => {
         dispatch(addTaskAC(title, todoListId))
     }

     const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
         dispatch(changeTaskStatusAC(taskId, isDone, todoListId))
     }
     const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
         dispatch(changeTaskTitleAC(taskId, title, todoListId))
     }

     const changeTodoListFilter = (filter: FilterButtonType, todoListId: string) => {
         dispatch(ChangeTodoListFilterAT(filter, todoListId))
     }

     const changeTodoListTitle = (title: string, todoListId: string) => {
         dispatch(ChangeTodoListTitleAT(title, todoListId))
     }

     const removeTodoList = (todoListId: string) => {
         dispatch(RemoveTodoListAC(todoListId))
     }*/

    const addTodoList = (title: string) => {
        dispatch(AddTodolistAC(title))
    }

    /* const getFilteredTasks = (tasks: TasksType[], filterValue: FilterButtonType) => {
         switch (filterValue) {
             case 'Active':
                 return tasks.filter(t => !t.isDone)
             case 'Completed':
                 return tasks.filter(t => t.isDone)
             default:
                 return tasks;
         }
     }*/
    const todoListComponents = todoLists.length
        ? todoLists.map(tl => {
                /*const filteredTasks = getFilteredTasks(tasks[tl.id], tl.filter)*/

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
