import {
  TasksActionsType,
  tasksReducer,
} from "features/TodolistsList/tasks-reducer";
import { todoListsReducer } from "features/TodolistsList/todolists-reducer";
import { combineReducers } from "redux";
import thunkMiddleware, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { appReducer } from "./app-reducer";
import { authReducer } from "features/Login/auth-reducer";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todoListsReducer,
  app: appReducer,
  auth: authReducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(thunkMiddleware),
});

export type AppRootStateType = ReturnType<typeof store.getState>;
type RootReducerActionsType = TasksActionsType;
export type AppThunkDispatch = ThunkDispatch<
  AppRootStateType,
  unknown,
  RootReducerActionsType
>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  RootReducerActionsType
>;

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> =
  useSelector;

// @ts-ignore
window.store = store;
