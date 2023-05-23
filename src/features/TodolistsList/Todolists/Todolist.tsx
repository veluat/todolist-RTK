import React, {useCallback, useEffect} from 'react'
import {TaskStatuses, TaskType} from "../../../api/todolistsAPI";
import {changeTodoListFilterAC, FilterButtonType, TodolistDomainType} from "../todolists-reducer";
import {useAppDispatch} from "../../../app/store";
import {fetchTasksTC} from "../tasks-reducer";
import EditableSpan from "../../../Components/EditableSpan/EditableSpan";
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import {DeleteForeverOutlined} from "@mui/icons-material";
import {AddItemForm} from "../../../Components/AddItemForm/AddItemForm";
import {Task} from "./Task/Task";
import {FilterButton} from "../../../Components/FilterButton/FilterButton";

type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    changeFilter: (todolistId: string, filter: FilterButtonType) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    demo?: boolean
}

export const Todolist = React.memo(function ({demo = false, ...props}: PropsType) {

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(fetchTasksTC(props.todolist.id))
    }, [])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolist.id)
    }, [props.addTask, props.todolist.id])

    const removeTodolist = () => {
        props.removeTodolist(props.todolist.id)
    }

    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.todolist.id, newTitle)
    }, [])

    const changeFilterHandlerCreator = useCallback((filter: FilterButtonType) => {
        dispatch(changeTodoListFilterAC( props.todolist.id, filter))
    }, [dispatch, props.todolist.id])

    let tasksForTodolist = props.tasks

    if (props.todolist.filter === 'Active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === 'Completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.todolist.title} changeTitle={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist} size='small' disabled={props.todolist.entityStatus === 'loading'}>
                    <DeleteForeverOutlined/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} placeholder={'add new task'} disabled={props.todolist.entityStatus === 'loading'}/>
            {tasksForTodolist.length
                ? <List> {
                    tasksForTodolist.map((task: TaskType) => {
                            return (
                                <Task key={task.id} task={task} todolistId={props.todolist.id}
                                      removeTask={props.removeTask}
                                      changeTaskTitle={props.changeTaskTitle}
                                      changeTaskStatus={props.changeTaskStatus}
                                />
                            )
                        }
                    )}</List>
                : <div>Your list is empty</div>}

            <div style={{display: "flex", justifyContent: 'flex-start'}}>
                <FilterButton name={'All'} color={props.todolist.filter === 'All' ? 'secondary' : 'primary'}
                              callback={changeFilterHandlerCreator}/>
                <FilterButton name={'Active'} color={props.todolist.filter === 'Active' ? 'secondary' : 'primary'}
                              callback={changeFilterHandlerCreator}/>
                <FilterButton name={'Completed'} color={props.todolist.filter === 'Completed' ? 'secondary' : 'primary'}
                              callback={changeFilterHandlerCreator}/>
            </div>
        </div>
    );






})