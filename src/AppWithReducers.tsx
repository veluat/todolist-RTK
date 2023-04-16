import React, {Reducer, useReducer} from "react";
import './app/App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./Components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    FilterButtonType,
    removeTodoListAC,
    todoListsReducer
} from "./store/todolists-reducer";
import {
    addTaskAC,
    updateTaskAC,
    removeTaskAC,
    tasksReducer, UpdateDomainTaskModelType, ActionsType
} from "./store/tasks-reducer";
import {TaskPriorities, TaskStatuses, TaskType, TodolistType} from "./api/todolistAPI";


export type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}

export function AppWithReducers() {
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, dispatchTodoLists] = useReducer(todoListsReducer, [
        {id: todoListId_1, title: 'What to learn', filter: 'All', addedDate: '', order: 0},
        {id: todoListId_2, title: 'What to buy', filter: 'All', addedDate: '', order: 0},
    ])

    const [tasks, dispatchTasks] = useReducer<Reducer<TasksStateType, ActionsType>>(tasksReducer, {
        [todoListId_1]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: todoListId_1, startDate: '', addedDate: '', order: 0, deadline: '', priority: TaskPriorities.Low, description: ''},
            {id: v1(), title: "JS", status: TaskStatuses.New, todoListId: todoListId_1, startDate: '', addedDate: '', order: 0, deadline: '', priority: TaskPriorities.Low, description: ''}
        ],
        [todoListId_2]: [
            {id: v1(), title: "Water", status: TaskStatuses.Completed, todoListId: todoListId_2, startDate: '', addedDate: '', order: 0, deadline: '', priority: TaskPriorities.Low, description: ''},
            {id: v1(), title: "RootBeer", status: TaskStatuses.Completed, todoListId: todoListId_2, startDate: '', addedDate: '', order: 0, deadline: '', priority: TaskPriorities.Low, description: ''},

        ]
    })

    const removeTask = (taskId: string, todoListId: string) => {
        dispatchTasks(removeTaskAC(taskId, todoListId))
    }

    const addTask = (title: string, todoListId: string) => {
        dispatchTasks(addTaskAC({
            todoListId: todoListId,
            title: title,
            status: TaskStatuses.New,
            addedDate: '',
            order: 0,
            deadline: '',
            priority: 0,
            description: '',
            startDate: '',
            id: 'id exists'
        }))
    }

    const changeTaskStatus = (taskId: string, model: UpdateDomainTaskModelType, todoListId: string) => {
        dispatchTasks(updateTaskAC(taskId, model, todoListId))
    }
    const changeTaskTitle = (taskId: string, model: UpdateDomainTaskModelType, todoListId: string) => {
        dispatchTasks(updateTaskAC(taskId, model, todoListId))
    }

    const changeTodoListFilter = (filter: FilterButtonType, todoListId: string) => {
        dispatchTodoLists(changeTodoListFilterAC(filter, todoListId))
    }

    const changeTodoListTitle = (title: string, todoListId: string) => {
        dispatchTodoLists(changeTodoListTitleAC(title, todoListId))
    }

    const removeTodoList = (todoListId: string) => {
        let action = removeTodoListAC(todoListId)
        dispatchTodoLists(action)
        dispatchTasks(action)
    }

    const addTodoList = (title: string) => {
        let action = addTodolistAC({
            id: v1(),
            title,
            addedDate: '',
            order: 0
        })
        dispatchTodoLists(action)
        dispatchTasks(action)
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
                            <TodoList
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
