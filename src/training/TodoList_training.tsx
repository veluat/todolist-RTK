import React, {ChangeEvent, useCallback} from "react";
import {AddItemForm} from "../Components/AddItemForm/AddItemForm";
import EditableSpan from "../Components/EditableSpan/EditableSpan";
import {Button, Checkbox, IconButton, List, ListItem} from "@mui/material";
import {DeleteForeverOutlined} from "@mui/icons-material";
import {TaskStatuses, TaskType} from "../api/todolistsAPI";
import {FilterButtonType} from "../BLL-reducers/todolists-reducer";
import {UpdateDomainTaskModelType} from "../BLL-reducers/tasks-reducer";

export type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterButtonType
    removeTask: (taskId: string, todoListId: string) => void
    changeTodoListFilter: (todoListId: string, filter: FilterButtonType) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTaskTitle: (taskId: string, model: UpdateDomainTaskModelType, todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
    demo?: boolean
}

export const TodoList_training = ({demo = false, ...props}: TodoListPropsType) => {

    const tasksJSXItemsList = props.tasks.length
        ? <List>
            {
                props.tasks.map((task: TaskType) => {
                        const removeTask = () => props.removeTask(task.id, props.todoListId)
                        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New, props.todoListId)
                        const changeTaskTitle = (newTitle: string) => props.changeTaskTitle(task.id, {title: newTitle}, props.todoListId)
                        const isDoneClass = task.status === TaskStatuses.Completed ? 'isDone' : ''
                        return (
                            <ListItem key={task.id} style={{padding: '0'}} className={isDoneClass}>
                                <Checkbox
                                    size='small'
                                    color='primary'
                                    checked={task.status === TaskStatuses.Completed}
                                    onChange={changeTaskStatus}
                                />
                                <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                                <IconButton onClick={removeTask} size='small'>
                                    <DeleteForeverOutlined/>
                                </IconButton>
                            </ListItem>
                        )
                    }
                )}</List>
        : <span>Your list is empty</span>

    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.todoListId)
    }
    const changeFilterHandlerCreator = (filter: FilterButtonType) => {
        return () => props.changeTodoListFilter(props.todoListId, filter)
    }
    const removeTodoList = () => props.removeTodoList(props.todoListId)
    const addTask = useCallback((title: string) => props.addTask(title, props.todoListId), [props.addTask, props.todoListId])
    const btnStyle = {marginRight: '3px'}

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList} size='small'>
                    <DeleteForeverOutlined/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} placeholder={'add new task'}/>
            {tasksJSXItemsList}
            <div>
                <Button
                    style={btnStyle}
                    variant='contained'
                    color={props.filter === 'All' ? 'secondary' : 'primary'}
                    size='small'
                    disableElevation
                    onClick={changeFilterHandlerCreator('All')}
                >All
                </Button>
                <Button
                    style={btnStyle}
                    variant='contained'
                    color={props.filter === 'Active' ? 'secondary' : 'primary'}
                    size='small'
                    disableElevation
                    onClick={changeFilterHandlerCreator('Active')}
                >Active
                </Button>
                <Button
                    variant='contained'
                    color={props.filter === 'Completed' ? 'secondary' : 'primary'}
                    size='small'
                    disableElevation
                    onClick={changeFilterHandlerCreator('Completed')}
                >Completed
                </Button>
            </div>
        </div>

    )
        ;
};
