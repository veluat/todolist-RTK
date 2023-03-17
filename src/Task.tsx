import React, {ChangeEvent, memo} from 'react';
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {DeleteForeverOutlined} from "@material-ui/icons";
import {TasksType} from "./TodoListWithRedux";

type TaskPropsType = {
    task: TasksType
    changeTaskStatus: (id: string, isDone: boolean) => void
    changeTaskTitle: (taskId: string, nextTitle: string) => void
    removeTask: (taskId: string)=>void
}

export const Task = memo(({
                         task,
                         changeTaskStatus,
                         changeTaskTitle,
                         removeTask
                     }: TaskPropsType) => {
    const onClickHandler = () => removeTask(task.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked)
    const onTitleChangeHandler = (nextTitle: string) => changeTaskTitle(task.id, nextTitle)

    return (
        <ListItem key={task.id} style={{padding: '0'}} className={task.isDone ? 'isDone' : ''}>
            <Checkbox
                size='small'
                color='primary'
                checked={task.isDone}
                onChange={onChangeHandler}
            />
            <EditableSpan title={task.title} changeTitle={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler} size='small'>
                <DeleteForeverOutlined/>
            </IconButton>
        </ListItem>
    );
});

