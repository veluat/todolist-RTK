import React, { useCallback, useEffect } from "react";
import { AddItemForm } from "common/components/AddItemForm/AddItemForm";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { removeTaskTC, tasksThunks } from "features/TodolistsList/tasks.slice";
import {
  addTodolistTC,
  changeTodolistTitleTC,
  fetchTodolistsTC,
  FilterButtonType,
  removeTodolistTC,
  TodolistDomainType,
  todoListsActions,
} from "features/TodolistsList/todolists.slice";
import { Todolist } from "./Todolist/Todolist";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTodolists } from "features/TodolistsList/todolists.selectors";
import { selectTasks } from "features/TodolistsList/tasks.selectors";
import { selectIsLoggedIn } from "features/auth/auth.selectors";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { TaskStatuses } from "common/enums";

type PropsType = {
  demo?: boolean;
};

export const TodolistsList: React.FC<PropsType> = ({ demo = false }) => {
  const todolists = useSelector(selectTodolists);
  const tasks = useSelector(selectTasks);
  const isLoggedIn = useSelector(selectIsLoggedIn);
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
    dispatch(tasksThunks.addTask({ todolistId, title }));
  }, []);

  const changeStatus = useCallback(function (
    taskId: string,
    status: TaskStatuses,
    todolistId: string
  ) {
    dispatch(
      tasksThunks.updateTask({ taskId, domainModel: { status }, todolistId })
    );
  },
  []);

  const changeTaskTitle = useCallback(function (
    taskId: string,
    title: string,
    todolistId: string
  ) {
    dispatch(
      tasksThunks.updateTask({ taskId, domainModel: { title }, todolistId })
    );
  },
  []);

  const changeFilter = useCallback(
    (todoListId: string, filter: FilterButtonType) => {
      dispatch(
        todoListsActions.changeTodoListFilter({ id: todoListId, filter })
      );
    },
    []
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
