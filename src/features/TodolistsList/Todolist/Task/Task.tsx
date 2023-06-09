import React, { ChangeEvent, memo, useCallback } from "react";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import ListItem from "@mui/material/ListItem";
import EditableSpan from "../../../../common/components/EditableSpan/EditableSpan";
import { DeleteForeverOutlined } from "@mui/icons-material";
import { TaskStatuses } from "common/enums";
import { TaskType } from "features/TodolistsList/todolists.api.types";

type TaskPropsType = {
  task: TaskType;
  todolistId: string;
  changeTaskStatus: (
    id: string,
    status: TaskStatuses,
    todolistId: string
  ) => void;
  changeTaskTitle: (
    taskId: string,
    newTitle: string,
    todolistId: string
  ) => void;
  removeTask: (taskId: string, todolistId: string) => void;
};

export const Task = memo((props: TaskPropsType) => {
  const onClickHandler = useCallback(
    () => props.removeTask(props.task.id, props.todolistId),
    [props.task.id, props.todolistId]
  );

  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let newIsDoneValue = e.currentTarget.checked;
      props.changeTaskStatus(
        props.task.id,
        newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New,
        props.todolistId
      );
    },
    [props.task.id, props.todolistId]
  );

  const onTitleChangeHandler = useCallback(
    (newValue: string) => {
      props.changeTaskTitle(props.task.id, newValue, props.todolistId);
    },
    [props.task.id, props.todolistId]
  );

  return (
    <ListItem
      key={props.task.id}
      style={{ padding: "0" }}
      className={props.task.status === TaskStatuses.Completed ? "isDone" : ""}
    >
      <Checkbox
        size="small"
        color="primary"
        checked={props.task.status === TaskStatuses.Completed}
        onChange={onChangeHandler}
      />
      <EditableSpan
        title={props.task.title}
        changeTitle={onTitleChangeHandler}
      />
      <IconButton onClick={onClickHandler} size="small">
        <DeleteForeverOutlined />
      </IconButton>
    </ListItem>
  );
});
