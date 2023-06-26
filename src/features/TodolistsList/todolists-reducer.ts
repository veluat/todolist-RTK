import { todolistsAPI, TodolistType } from "api/todolistsAPI";
import { Dispatch } from "redux";

import { handleServerNetworkError } from "utils/error-utils";
import { fetchTasksTC } from "./tasks-reducer";
import { AppThunk } from "app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { appActions, RequestStatusType } from "app/app-reducer";

const initialState: TodolistDomainType[] = [];

const slice = createSlice({
  name: "todoLists",
  initialState,
  reducers: {
    addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
      state.unshift({
        ...action.payload.todolist,
        filter: "All",
        entityStatus: "idle",
      });
    },

    removeTodoListAC(state, action: PayloadAction<{ id: string }>) {
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    changeTodoListFilterAC(
      state,
      action: PayloadAction<{ id: string; filter: FilterButtonType }>
    ) {
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      state[index].filter = action.payload.filter;
    },
    changeTodoListTitleAC(
      state,
      action: PayloadAction<{ id: string; title: string }>
    ) {
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      state[index].title = action.payload.title;
    },
    setTodolistsAC(
      state,
      action: PayloadAction<{ todolists: TodolistType[] }>
    ) {
      return action.payload.todolists.map((tl) => ({
        ...tl,
        filter: "All",
        entityStatus: "idle",
      }));
    },
    changeTodoListEntityStatusAC(
      state,
      action: PayloadAction<{ id: string; status: RequestStatusType }>
    ) {
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      state[index].entityStatus = action.payload.status;
    },
    clearTodosDataAC(state) {
      return [];
    },
  },
});
export const todoListsReducer = slice.reducer;
export const {
  addTodolistAC,
  removeTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  setTodolistsAC,
  changeTodoListEntityStatusAC,
  clearTodosDataAC,
} = slice.actions;

//thunks
export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
  dispatch(appActions.setRequestStatus({ status: "loading" }));
  todolistsAPI
    .getTodolists()
    .then((res) => {
      dispatch(setTodolistsAC({ todolists: res.data }));
      dispatch(appActions.setRequestStatus({ status: "succeeded" }));
      return res.data;
    })
    .then((todos) => {
      todos.forEach((tl) => dispatch(fetchTasksTC(tl.id)));
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const removeTodolistTC = (todolistId: string): AppThunk => {
  return (dispatch) => {
    dispatch(appActions.setRequestStatus({ status: "loading" }));
    dispatch(
      changeTodoListEntityStatusAC({ status: "loading", id: todolistId })
    );
    todolistsAPI
      .deleteTodolist(todolistId)
      .then((res) => {
        dispatch(removeTodoListAC({ id: todolistId }));
        dispatch(appActions.setRequestStatus({ status: "succeeded" }));
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
};

export const addTodolistTC = (title: string): AppThunk => {
  return (dispatch) => {
    dispatch(appActions.setRequestStatus({ status: "loading" }));
    todolistsAPI
      .createTodolist(title)
      .then((res) => {
        dispatch(addTodolistAC({ todolist: res.data.data.item }));
        dispatch(appActions.setRequestStatus({ status: "succeeded" }));
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
};

export const changeTodolistTitleTC = (id: string, title: string): AppThunk => {
  return (dispatch) => {
    dispatch(appActions.setRequestStatus({ status: "loading" }));
    todolistsAPI
      .updateTodolist(id, title)
      .then((res) => {
        dispatch(changeTodoListTitleAC({ title, id }));
        dispatch(appActions.setRequestStatus({ status: "succeeded" }));
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
};

// types
export type FilterButtonType = "All" | "Active" | "Completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterButtonType;
  entityStatus: RequestStatusType;
};
export type AddTodoListAT = ReturnType<typeof addTodolistAC>;
export type RemoveTodoListAT = ReturnType<typeof removeTodoListAC>;
export type SetTodoListsAT = ReturnType<typeof setTodolistsAC>;
export type ClearTodosDataAT = ReturnType<typeof clearTodosDataAC>;
export type TodosActionsType =
  | RemoveTodoListAT
  | AddTodoListAT
  | ReturnType<typeof changeTodoListFilterAC>
  | ReturnType<typeof changeTodoListTitleAC>
  | SetTodoListsAT
  | ReturnType<typeof changeTodoListEntityStatusAC>
  | ClearTodosDataAT;
