import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import EditableSpan from "../EditableSpan/EditableSpan";
import {DeleteForeverOutlined} from "@material-ui/icons";
import {TasksType} from "../TodoListWithRedux/TodoListWithRedux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../store/tasks-reducer";
import {useDispatch} from "react-redux";

type TaskPropsType = {
    task: TasksType
    todoListId: string
}

export const Task = memo(({
                              task,
                              todoListId
                          }: TaskPropsType) => {

    const dispatch = useDispatch();

    const removeTask = useCallback(() => dispatch(removeTaskAC(task.id, todoListId)), [dispatch, task.id, todoListId])
    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked, todoListId)), [dispatch, todoListId, task.id])
    const changeTaskTitle = useCallback((newTitle: string) => dispatch(changeTaskTitleAC(task.id, newTitle, todoListId)), [dispatch, todoListId, task.id])

    console.log('Task')

    return (
        <ListItem key={task.id} style={{padding: '0'}} className={task.isDone ? 'isDone' : ''}>
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
    );
});

