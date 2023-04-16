import React, {memo, useCallback} from 'react';
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import EditableSpan from "../EditableSpan/EditableSpan";
import {DeleteForeverOutlined} from "@material-ui/icons";
import {
    removeTaskTC,
    updateTaskTC,
} from "../../store/tasks-reducer";
import {TaskStatuses, TaskType} from "../../api/todolistAPI";
import {useAppDispatch} from "../../store/store";

type TaskPropsType = {
    task: TaskType
    todoListId: string
}

export const Task = memo(({
                              task,
                              todoListId
                          }: TaskPropsType) => {

    const dispatch = useAppDispatch();

    const removeTask = useCallback(function(taskId: string, todolistId: string) {
        dispatch(removeTaskTC(taskId, todolistId))
    }, [])
    const changeTaskStatus = useCallback(function(taskId: string, status: TaskStatuses, todolistId: string) {
        dispatch(updateTaskTC(task.id, {status}, todolistId))}, [])

    const changeTaskTitle = useCallback(function(taskId: string, newTitle: string, todolistId: string) {
        dispatch(updateTaskTC(task.id, {title: newTitle}, todolistId))}, [])

    console.log('Task')

    return (
        <ListItem key={task.id} style={{padding: '0'}} className={task.status === TaskStatuses.Completed ? 'isDone' : ''}>
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
    );
});

