import {
  TaskPriorities,
  TaskStatuses,
  TaskType,
  todolistsAPI,
  UpdateTaskModelType,
} from "api/todolistsAPI";
import { Dispatch } from "redux";
import {
  addTodolistAC,
  AddTodoListAT,
  clearTodosDataAC,
  ClearTodosDataAT,
  removeTodoListAC,
  RemoveTodoListAT,
  setTodolistsAC,
  SetTodoListsAT,
} from "./todolists-reducer";
import { AppRootStateType } from "app/store";
import {
  SetAppErrorActionType,
  setRequestStatusAC,
  SetRequestStatusType,
} from "app/app-reducer";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "utils/error-utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TasksStateType = {};
export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

const slice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    removeTaskAC(
      state,
      action: PayloadAction<{ taskId: string; todolistId: string }>
    ) {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex((t) => t.id === action.payload.taskId);
      if (index > -1) {
        tasks.splice(index, 1);
      }
    },
    addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
      state[action.payload.task.todoListId].unshift(action.payload.task);
    },
    updateTaskAC(
      state,
      action: PayloadAction<{
        taskId: string;
        model: UpdateDomainTaskModelType;
        todoListId: string;
      }>
    ) {
      const tasks = state[action.payload.todoListId];
      const index = tasks.findIndex((t) => t.id === action.payload.taskId);
      if (index > -1) {
        tasks[index] = { ...tasks[index], ...action.payload.model };
      }
    },
    setTasksAC(
      state,
      action: PayloadAction<{ tasks: TaskType[]; todoListId: string }>
    ) {
      state[action.payload.todoListId] = action.payload.tasks;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTodolistAC, (state, action) => {
      state[action.payload.todolist.id] = [];
    });
    builder.addCase(removeTodoListAC, (state, action) => {
      delete state[action.payload.id];
    });

    builder.addCase(setTodolistsAC, (state, action) => {
      action.payload.todolists.forEach((tl) => {
        state[tl.id] = [];
      });
    });
    builder.addCase(clearTodosDataAC, (state, action) => {
      return {};
    });
  },
});

export const tasksReducer = slice.reducer;
export const { removeTaskAC, addTaskAC, updateTaskAC, setTasksAC } =
  slice.actions;

// thunks
export const fetchTasksTC =
  (todolistId: string) => (dispatch: Dispatch<TasksActionsType>) => {
    dispatch(setRequestStatusAC({ status: "loading" }));
    todolistsAPI
      .getTasks(todolistId)
      .then((res) => {
        dispatch(setTasksAC({ tasks: res.data.items, todoListId: todolistId }));
        dispatch(setRequestStatusAC({ status: "succeeded" }));
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };

export const removeTaskTC =
  (taskId: string, todolistId: string) =>
  (dispatch: Dispatch<TasksActionsType>) => {
    dispatch(setRequestStatusAC({ status: "loading" }));
    todolistsAPI
      .deleteTask(todolistId, taskId)
      .then((res) => {
        dispatch(removeTaskAC({ taskId: taskId, todolistId: todolistId }));
        dispatch(setRequestStatusAC({ status: "succeeded" }));
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };

export const addTaskTC =
  (title: string, todolistId: string) =>
  (dispatch: Dispatch<TasksActionsType>) => {
    dispatch(setRequestStatusAC({ status: "loading" }));
    todolistsAPI
      .createTask(todolistId, title)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(addTaskAC({ task: res.data.data.item }));
        } else {
          handleServerAppError(res.data, dispatch);
        }
        dispatch(setRequestStatusAC({ status: "succeeded" }));
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };

export const updateTaskTC =
  (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
  (dispatch: Dispatch<TasksActionsType>, getState: () => AppRootStateType) => {
    dispatch(setRequestStatusAC({ status: "loading" }));
    const state = getState();
    const task = state.tasks[todolistId].find((t) => t.id === taskId);
    if (!task) {
      //throw new Error("task not found in the state");
      console.warn("task not found in the state");
      return;
    }
    const apiModel: UpdateTaskModelType = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      title: task.title,
      status: task.status,
      ...model,
    };
    todolistsAPI
      .updateTask(todolistId, taskId, apiModel)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(
            updateTaskAC({ taskId: taskId, todoListId: todolistId, model })
          );
          dispatch(setRequestStatusAC({ status: "succeeded" }));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };

// types

export type UpdateDomainTaskModelType = {
  description?: string;
  title?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};
export type TasksActionsType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof updateTaskAC>
  | ReturnType<typeof setTasksAC>
  | AddTodoListAT
  | RemoveTodoListAT
  | SetTodoListsAT
  | SetRequestStatusType
  | SetAppErrorActionType
  | ClearTodosDataAT;
