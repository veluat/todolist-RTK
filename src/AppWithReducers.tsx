import React, {Reducer, useReducer} from "react";
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
    RemoveTodoListAC,
    todoListsReducer
} from "./store/todolists-reducer";
import {
    ActionType,
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./store/tasks-reducer";


export type FilterButtonType = 'All' | 'Active' | 'Completed'
export type TasksStateType = {
    [todoListId: string]: Array<TasksType>
}

export function AppWithReducers() {
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, dispatchTodoLists] = useReducer(todoListsReducer, [
        {id: todoListId_1, title: 'What to learn', filter: 'All'},
        {id: todoListId_2, title: 'What to buy', filter: 'All'},
    ])

    const [tasks, dispatchTasks] = useReducer<Reducer<TasksStateType, ActionType>>(tasksReducer, {
        [todoListId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "RestAPI", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "Water", isDone: true},
            {id: v1(), title: "RootBeer", isDone: true},
            {id: v1(), title: "Cola", isDone: false},
            {id: v1(), title: "Buckwheat", isDone: false},
            {id: v1(), title: "Meet", isDone: false},
        ]
    })

    const removeTask = (taskId: string, todoListId: string) => {
        dispatchTasks(removeTaskAC(taskId, todoListId))
    }

    const addTask = (title: string, todoListId: string) => {
        dispatchTasks(addTaskAC(title, todoListId))
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        dispatchTasks(changeTaskStatusAC(taskId, isDone, todoListId))
    }
    const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
        dispatchTasks(changeTaskTitleAC(taskId, title, todoListId))
    }

    const changeTodoListFilter = (filter: FilterButtonType, todoListId: string) => {
        dispatchTodoLists(ChangeTodoListFilterAT(filter, todoListId))
    }

    const changeTodoListTitle = (title: string, todoListId: string) => {
        dispatchTodoLists(ChangeTodoListTitleAT(title, todoListId))
    }

    const removeTodoList = (todoListId: string) => {
        let action = RemoveTodoListAC(todoListId)
        dispatchTodoLists(action)
        dispatchTasks(action)
    }

    const addTodoList = (title: string) => {
        let action = AddTodolistAC(title)
        dispatchTodoLists(action)
        dispatchTasks(action)
    }

    const getFilteredTasks = (tasks: TasksType[], filterValue: FilterButtonType) => {
        switch (filterValue) {
            case 'Active':
                return tasks.filter(t => !t.isDone)
            case 'Completed':
                return tasks.filter(t => t.isDone)
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
