import React, {ChangeEvent, useCallback} from "react";
import {FilterButtonType} from "./App";
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton, List, ListItem} from "@material-ui/core";
import {DeleteForeverOutlined} from "@material-ui/icons";

export type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: Array<TasksType>
    filter: FilterButtonType
    removeTask: (taskId: string, todoListId: string) => void
    changeTodoListFilter: (filter: FilterButtonType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
}
export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList = (props: TodoListPropsType) => {

    const tasksJSXItemsList = props.tasks.length
        ? <List>
            {
                props.tasks.map((task: TasksType) => {
                        const removeTask = () => props.removeTask(task.id, props.todoListId)
                        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
                        const changeTaskTitle = (nextTitle: string) => props.changeTaskTitle(task.id, nextTitle, props.todoListId)
                        const isDoneClass = task.isDone ? 'isDone' : ''
                        return (
                            <ListItem key={task.id} style={{padding: '0'}} className={isDoneClass}>
                                <Checkbox
                                    size='small'
                                    color='primary'
                                    checked={task.isDone}
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
        return () => props.changeTodoListFilter(filter, props.todoListId)
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
