import React, {useCallback, useEffect} from 'react'
import {TaskStatuses, TaskType} from "../../../api/todolistsAPI";
import {changeTodoListFilterAC, FilterButtonType} from "../../../BLL-reducers/todolists-reducer";
import {useAppDispatch} from "../../../app/store";
import {fetchTasksTC} from "../../../BLL-reducers/tasks-reducer";
import EditableSpan from "../../../Components/EditableSpan/EditableSpan";
import {IconButton, List} from "@mui/material";
import {DeleteForeverOutlined} from "@mui/icons-material";
import {AddItemForm} from "../../../Components/AddItemForm/AddItemForm";
import {Task} from "./Task/Task";
import {FilterButton} from "../../../Components/FilterButton/FilterButton";

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (todolistId: string, filter: FilterButtonType) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterButtonType
    demo?: boolean
}

export const Todolist = React.memo(function ({demo = false, ...props}: PropsType) {

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(fetchTasksTC(props.id))
    }, [])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }, [])

    const changeFilterHandlerCreator = useCallback((filter: FilterButtonType) => {
        dispatch(changeTodoListFilterAC( props.id, filter))
    }, [dispatch, props.id])

    let tasksForTodolist = props.tasks

    if (props.filter === 'Active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === 'Completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist} size='small'>
                    <DeleteForeverOutlined/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} placeholder={'add new task'}/>
            {tasksForTodolist.length
                ? <List> {
                    tasksForTodolist.map((task: TaskType) => {
                            return (
                                <Task key={task.id} task={task} todolistId={props.id}
                                      removeTask={props.removeTask}
                                      changeTaskTitle={props.changeTaskTitle}
                                      changeTaskStatus={props.changeTaskStatus}
                                />
                            )
                        }
                    )}</List>
                : <div>Your list is empty</div>}

            <div style={{display: "flex", justifyContent: 'flex-start'}}>
                <FilterButton name={'All'} color={props.filter === 'All' ? 'secondary' : 'primary'}
                              callback={changeFilterHandlerCreator}/>
                <FilterButton name={'Active'} color={props.filter === 'Active' ? 'secondary' : 'primary'}
                              callback={changeFilterHandlerCreator}/>
                <FilterButton name={'Completed'} color={props.filter === 'Completed' ? 'secondary' : 'primary'}
                              callback={changeFilterHandlerCreator}/>
            </div>
        </div>
    );






})