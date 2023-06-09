import React, { useCallback, useEffect } from "react";
import {
  FilterValuesType,
  TodolistDomainType,
} from "features/TodolistsList/todolists.slice";
import EditableSpan from "../../../common/components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import { DeleteForeverOutlined } from "@mui/icons-material";
import { AddItemForm } from "common/components/AddItemForm/AddItemForm";
import { Task } from "./Task/Task";
import { FilterButton } from "common/components/FilterButton/FilterButton";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { tasksThunks } from "features/TodolistsList/tasks.slice";
import { TaskStatuses } from "common/enums";
import { TaskType } from "features/TodolistsList/todolists.api.types";

type PropsType = {
  todolist: TodolistDomainType;
  tasks: Array<TaskType>;
  changeFilter: (todolistId: string, filter: FilterValuesType) => void;
  addTask: (title: string, todolistId: string) => void;
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
  removeTodolist: (id: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
  demo?: boolean;
};

export const Todolist = React.memo(function ({
  demo = false,
  ...props
}: PropsType) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (demo) {
      return;
    }
    dispatch(tasksThunks.fetchTasks(props.todolist.id));
  }, []);

  const addTask = useCallback(
    (title: string) => {
      props.addTask(title, props.todolist.id);
    },
    [props.addTask, props.todolist.id]
  );

  const removeTodolist = () => {
    props.removeTodolist(props.todolist.id);
  };

  const changeTodolistTitle = useCallback(
    (newTitle: string) => {
      props.changeTodolistTitle(props.todolist.id, newTitle);
    },
    [props.todolist.id, props.changeTodolistTitle]
  );

  const changeFilterHandlerCreator = useCallback(
    (filter: FilterValuesType) => {
      props.changeFilter(props.todolist.id, filter);
    },
    [props.todolist.id, props.changeFilter]
  );

  let tasksForTodolist = props.tasks;

  if (props.todolist.filter === "Active") {
    tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (props.todolist.filter === "Completed") {
    tasksForTodolist = props.tasks.filter(
      (t) => t.status === TaskStatuses.Completed
    );
  }

  return (
    <div>
      <h3>
        <EditableSpan
          title={props.todolist.title}
          changeTitle={changeTodolistTitle}
        />
        <IconButton
          onClick={removeTodolist}
          size="small"
          disabled={props.todolist.entityStatus === "loading"}
        >
          <DeleteForeverOutlined />
        </IconButton>
      </h3>
      <AddItemForm
        addItem={addTask}
        placeholder={"add new task"}
        disabled={props.todolist.entityStatus === "loading"}
      />
      {tasksForTodolist.length ? (
        <List>
          {" "}
          {tasksForTodolist.map((task: TaskType) => {
            return (
              <Task
                key={task.id}
                task={task}
                todolistId={props.todolist.id}
                removeTask={props.removeTask}
                changeTaskTitle={props.changeTaskTitle}
                changeTaskStatus={props.changeTaskStatus}
              />
            );
          })}
        </List>
      ) : (
        <div>Your list is empty</div>
      )}

      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <FilterButton
          name={"All"}
          color={props.todolist.filter === "All" ? "secondary" : "primary"}
          callback={changeFilterHandlerCreator}
        />
        <FilterButton
          name={"Active"}
          color={props.todolist.filter === "Active" ? "secondary" : "primary"}
          callback={changeFilterHandlerCreator}
        />
        <FilterButton
          name={"Completed"}
          color={
            props.todolist.filter === "Completed" ? "secondary" : "primary"
          }
          callback={changeFilterHandlerCreator}
        />
      </div>
    </div>
  );
});
