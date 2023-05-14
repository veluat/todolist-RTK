import React, {useState} from "react";
import '../app/App.css';
import {TodoList_training} from "./TodoList_training";
import {v1} from "uuid";
import {AddItemForm} from "../Components/AddItemForm/AddItemForm";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolistsAPI";
import {FilterButtonType, TodolistDomainType} from "../BLL-reducers/todolists-reducer";
import {TasksStateType, UpdateDomainTaskModelType} from "../BLL-reducers/tasks-reducer";
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {Menu} from "@mui/icons-material";


type PropsType = {
    demo?: boolean
}

export function App_training({demo = false}: PropsType) {
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, setTodoLists] = useState<TodolistDomainType[]>([
        {id: todoListId_1, title: 'What to learn', filter: 'All', entityStatus: 'idle', addedDate: '', order: 0},
        {id: todoListId_2, title: 'What to buy', filter: 'All', entityStatus: 'idle', addedDate: '', order: 0},
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            {
                id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: todoListId_1,
                startDate: '', addedDate: '', order: 0, deadline: '', priority: TaskPriorities.Low, description: ''
            },
            {
                id: v1(), title: "JS", status: TaskStatuses.New, todoListId: todoListId_1,
                startDate: '', addedDate: '', order: 0, deadline: '', priority: TaskPriorities.Low, description: ''
            }
        ],
        [todoListId_2]: [
            {
                id: v1(), title: "Water", status: TaskStatuses.Completed, todoListId: todoListId_2,
                startDate: '', addedDate: '', order: 0, deadline: '', priority: TaskPriorities.Low, description: ''
            },
            {
                id: v1(), title: "RootBeer", status: TaskStatuses.Completed, todoListId: todoListId_2,
                startDate: '', addedDate: '', order: 0, deadline: '', priority: TaskPriorities.Low, description: ''
            }
        ]
    })

    const removeTask = (taskId: string, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(el => el.id !== taskId)})
    }

    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {
            id: v1(), title, status: TaskStatuses.New, todoListId,
            startDate: '', addedDate: '', order: 0, deadline: '', priority: TaskPriorities.Low, description: ''
        };
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }

    const changeTaskStatus = (taskId: string, status: TaskStatuses, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(el => el.id === taskId ? {...el, status} : el)})
    }
    const changeTaskTitle = (taskId: string, model: UpdateDomainTaskModelType, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(el => el.id === taskId ? {...el, model} : el)})
    }

    const changeTodoListFilter = (todoListId: string, filter: FilterButtonType) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filter} : tl))
    }

    const changeTodoListTitle = (title: string, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title} : tl))
    }

    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
    }

    const addTodoList = (title: string) => {
        const newTodoListId = v1()
        const newTodoList: TodolistDomainType = {
            id: newTodoListId,
            title,
            filter: 'All',
            entityStatus: 'idle',
            addedDate: '',
            order: 0
        }
        setTodoLists([newTodoList, ...todoLists])
        setTasks({...tasks, [newTodoListId]: []})
    }

    const getFilteredTasks = (tasks: TaskType[], filterValue: FilterButtonType) => {
        switch (filterValue) {
            case 'Active':
                return tasks.filter(t => t.status === TaskStatuses.New)
            case 'Completed':
                return tasks.filter(t => t.status === TaskStatuses.Completed)
            default:
                return tasks;
        }
    }

    const todoListComponents = todoLists.length
        ? todoLists.map(tl => {
                const filteredTasks = getFilteredTasks(tasks[tl.id], tl.filter)
                return (
                    <Grid item key={tl.id}>
                        <Paper elevation={8} style={{padding: '20px'}}>
                            <TodoList_training
                                todoListId={tl.id}
                                title={tl.title}
                                filter={tl.filter}
                                tasks={filteredTasks}
                                addTask={addTask}
                                removeTask={removeTask}
                                removeTodoList={removeTodoList}
                                changeTaskStatus={changeTaskStatus}
                                changeTodoListFilter={changeTodoListFilter}
                                changeTaskTitle={changeTaskTitle}
                                changeTodoListTitle={changeTodoListTitle}
                                demo={demo}
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
