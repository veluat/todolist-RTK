import React, { useCallback, useEffect } from "react";
import { AddItemForm } from "components/AddItemForm/AddItemForm";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSelector } from "app/store";
import {
  addTaskTC,
  removeTaskTC,
  TasksStateType,
  updateTaskTC,
} from "./tasks-reducer";
import {
  addTodolistTC,
  changeTodoListFilterAC,
  changeTodolistTitleTC,
  fetchTodolistsTC,
  FilterButtonType,
  removeTodolistTC,
  TodolistDomainType,
} from "./todolists-reducer";
import { TaskStatuses } from "api/todolistsAPI";
import { Todolist } from "./Todolists/Todolist";
import { Navigate } from "react-router-dom";

type PropsType = {
  demo?: boolean;
};

export const TodolistsList: React.FC<PropsType> = ({ demo = false }) => {
  const todolists = useAppSelector<TodolistDomainType[]>(
    (state) => state.todolists
  );
  const tasks = useAppSelector<TasksStateType>((state) => state.tasks);
  const isLoggedIn = useAppSelector<boolean>((state) => state.auth.isLoggedIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (demo || !isLoggedIn) {
      return;
    }
    dispatch(fetchTodolistsTC());
  }, []);

  const removeTask = useCallback(function (taskId: string, todolistId: string) {
    dispatch(removeTaskTC(taskId, todolistId));
  }, []);

  const addTask = useCallback(function (title: string, todolistId: string) {
    dispatch(addTaskTC(title, todolistId));
  }, []);

  const changeStatus = useCallback(function (
    taskId: string,
    status: TaskStatuses,
    todolistId: string
  ) {
    dispatch(updateTaskTC(taskId, { status }, todolistId));
  },
  []);

  const changeTaskTitle = useCallback(function (
    taskId: string,
    newTitle: string,
    todolistId: string
  ) {
    dispatch(updateTaskTC(taskId, { title: newTitle }, todolistId));
  },
  []);

  const changeFilter = useCallback(
    (todoListId: string, filter: FilterButtonType) => {
      dispatch(changeTodoListFilterAC({ id: todoListId, filter: filter }));
    }, []
  );

  const removeTodolist = useCallback(function (todoListId: string) {
    dispatch(removeTodolistTC(todoListId));
  }, []);

  const changeTodolistTitle = useCallback(function (id: string, title: string) {
    dispatch(changeTodolistTitleTC(id, title));
  }, []);

  const addTodoList = useCallback((title: string) => {
    dispatch(addTodolistTC(title));
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Container fixed style={{ paddingTop: "20px" }}>
        <Grid container style={{ padding: "0 0 20px 0" }}>
          <AddItemForm addItem={addTodoList} placeholder={"add new todoList"} />
        </Grid>
        <Grid container spacing={3}>
          {todolists.length ? (
            todolists.map((tl: TodolistDomainType) => {
              let allTodolistTasks = tasks[tl.id];
              return (
                <Grid item key={tl.id}>
                  <Paper elevation={8} style={{ padding: "20px" }}>
                    <Todolist
                      todolist={tl}
                      tasks={allTodolistTasks}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      removeTodolist={removeTodolist}
                      changeTaskTitle={changeTaskTitle}
                      changeTodolistTitle={changeTodolistTitle}
                      demo={demo}
                    />
                  </Paper>
                </Grid>
              );
            })
          ) : (
            <span style={{ padding: "20px" }}>Create your first todoList!</span>
          )}
        </Grid>
      </Container>
    </>
  );
};
