import React, {ChangeEvent, memo, useCallback, useState} from "react";
import {FilterButtonType} from "./App";
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton, List, ListItem} from "@material-ui/core";
import {DeleteForeverOutlined} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {ChangeTodoListFilterAT, ChangeTodoListTitleAT, RemoveTodoListAC} from "./store/todolists-reducer";
import {FilterButton} from "./FilterButton";

export type TodoListPropsType = {
    todoListId: string
    title: string
    filter: FilterButtonType
}
export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoListWithRedux = memo((props: TodoListPropsType) => {
    console.log('TodoListWithRedux')

    const tasks = useSelector<AppRootStateType, TasksType[]>(state => state.tasks[props.todoListId])

    const dispatch = useDispatch()

    const changeTodoListTitle = (title: string) => {
        dispatch(ChangeTodoListTitleAT(title, props.todoListId))
    }
    const changeFilterHandlerCreator = useCallback((filter: FilterButtonType) => {
        dispatch(ChangeTodoListFilterAT(filter, props.todoListId))
    }, [dispatch, props.todoListId])

    const removeTodoList = () => dispatch(RemoveTodoListAC(props.todoListId))

    const addTask = useCallback((title: string) => dispatch(addTaskAC(title, props.todoListId)), [dispatch, props.todoListId])

    let allTodolistTasks = tasks;
    let tasksForTodolist = allTodolistTasks;
    if (props.filter === 'Active') {
        tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
    }
    if (props.filter === 'Completed') {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList} size='small'>
                    <DeleteForeverOutlined/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} placeholder={'add new task'}/>
            {tasks.length
                ? <List> {
                    tasksForTodolist.map((task: TasksType) => {
                            const removeTask = () => dispatch(removeTaskAC(task.id, props.todoListId))
                            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked, props.todoListId))
                            const changeTaskTitle = (nextTitle: string) => dispatch(changeTaskTitleAC(task.id, nextTitle, props.todoListId))
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
                : <span>Your list is empty</span>}
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
});
