import { todolistsAPI, TodolistType } from "common/api/common.api";
import { handleServerNetworkError } from "common/utils";
import { AppThunk } from "app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { appActions, RequestStatusType } from "app/app.slice";
import { clearTasksAndTodos } from "common/actions/common.actions";
import { tasksThunks } from "features/TodolistsList/tasks.slice";

const slice = createSlice({
  name: "todoLists",
  initialState: [] as TodolistDomainType[],
  reducers: {
    addTodolist(state, action: PayloadAction<{ todolist: TodolistType }>) {
      state.unshift({
        ...action.payload.todolist,
        filter: "All",
        entityStatus: "idle",
      });
    },
    removeTodoList(state, action: PayloadAction<{ id: string }>) {
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      if (index !== -1) state.splice(index, 1);
    },
    changeTodoListFilter(
      state,
      action: PayloadAction<{ id: string; filter: FilterButtonType }>
    ) {
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      if (index !== -1) state[index].filter = action.payload.filter;
    },
    changeTodoListTitle(
      state,
      action: PayloadAction<{ id: string; title: string }>
    ) {
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      if (index !== -1) state[index].title = action.payload.title;
    },
    setTodolists(state, action: PayloadAction<{ todolists: TodolistType[] }>) {
      return action.payload.todolists.map((tl) => ({
        ...tl,
        filter: "All",
        entityStatus: "idle",
      }));
    },
    changeTodoListEntityStatus(
      state,
      action: PayloadAction<{ id: string; entityStatus: RequestStatusType }>
    ) {
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      if (index !== -1) state[index].entityStatus = action.payload.entityStatus;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(clearTasksAndTodos, () => {
      return [];
    });
  },
});
export const todolistsSlice = slice.reducer;
export const todoListsActions = slice.actions;

//thunks
export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
  dispatch(appActions.setRequestStatus({ status: "loading" }));
  todolistsAPI
    .getTodolists()
    .then((res) => {
      dispatch(todoListsActions.setTodolists({ todolists: res.data }));
      dispatch(appActions.setRequestStatus({ status: "succeeded" }));
      return res.data;
    })
    .then((todos) => {
      todos.forEach((tl) => dispatch(tasksThunks.fetchTasks(tl.id)));
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const removeTodolistTC = (id: string): AppThunk => {
  return (dispatch) => {
    dispatch(appActions.setRequestStatus({ status: "loading" }));
    dispatch(
      todoListsActions.changeTodoListEntityStatus({
        entityStatus: "loading",
        id: id,
      })
    );
    todolistsAPI
      .deleteTodolist(id)
      .then((res) => {
        dispatch(todoListsActions.removeTodoList({ id: id }));
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
        dispatch(
          todoListsActions.addTodolist({ todolist: res.data.data.item })
        );
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
        dispatch(todoListsActions.changeTodoListTitle({ title, id }));
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
