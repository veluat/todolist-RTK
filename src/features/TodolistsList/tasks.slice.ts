import {
  createAppAsyncThunk,
  handleServerAppError,
  handleServerNetworkError,
} from "common/utils";
import { createSlice } from "@reduxjs/toolkit";
import { appActions } from "app/app.slice";
import { todolistsThunks } from "features/TodolistsList/todolists.slice";
import { todolistsApi } from "features/TodolistsList/todolists.api";
import { ResultCode, TaskPriorities, TaskStatuses } from "common/enums";
import {
  AddTaskArgType,
  RemoveTaskArgType,
  TaskType,
  UpdateTaskArgType,
  UpdateTaskModelType,
} from "features/TodolistsList/todolists.api.types";
import { clearTasksAndTodolists } from "common/actions/common.actions";

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

const slice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state[action.payload.task.todoListId].unshift(action.payload.task);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId];
        const index = tasks.findIndex((t) => t.id === action.payload.taskId);
        if (index > -1) {
          tasks[index] = { ...tasks[index], ...action.payload.domainModel };
        }
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId];
        const index = tasks.findIndex((t) => t.id === action.payload.taskId);
        if (index > -1) {
          tasks.splice(index, 1);
        }
      })
      .addCase(todolistsThunks.addTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(todolistsThunks.removeTodolist.fulfilled, (state, action) => {
        delete state[action.payload.id];
      })
      .addCase(todolistsThunks.fetchTodolists.fulfilled, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state[tl.id] = [];
        });
      })
      .addCase(clearTasksAndTodolists, () => {
        return {};
      });
  },
});

// thunks
const fetchTasks = createAppAsyncThunk<
  {
    tasks: TaskType[];
    todolistId: string;
  },
  string
>("tasks/fetchTasks", async (todolistId, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    const res = await todolistsApi.getTasks(todolistId);
    const tasks = res.data.items;
    dispatch(appActions.setAppStatus({ status: "succeeded" }));
    return { tasks, todolistId };
  } catch (e) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  }
});

const addTask = createAppAsyncThunk<{ task: TaskType }, AddTaskArgType>(
  "tasks/addTask",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      const res = await todolistsApi.createTask(arg);
      if (res.data.resultCode === ResultCode.Success) {
        const task = res.data.data.item;
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
        return { task };
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    } catch (e) {
      handleServerNetworkError(e, dispatch);
      return rejectWithValue(null);
    }
  }
);

const updateTask = createAppAsyncThunk<UpdateTaskArgType, UpdateTaskArgType>(
  "tasks/updateTask",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI;
    try {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      const state = getState();
      const task = state.tasks[arg.todolistId].find((t) => t.id === arg.taskId);
      if (!task) {
        console.warn("task not found in the state");
        return rejectWithValue(null);
      }
      const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...arg.domainModel,
      };

      const res = await todolistsApi.updateTask(
        arg.todolistId,
        arg.taskId,
        apiModel
      );
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
        return arg;
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    } catch (e) {
      handleServerNetworkError(e, dispatch);
      return rejectWithValue(null);
    }
  }
);

const removeTask = createAppAsyncThunk<RemoveTaskArgType, RemoveTaskArgType>(
  "tasks/removeTask",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      const res = await todolistsApi.deleteTask(arg);
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return arg;
    } catch (e) {
      handleServerNetworkError(e, dispatch);
      return rejectWithValue(null);
    }
  }
);

export const tasksSlice = slice.reducer;
export const tasksActions = slice.actions;
export const tasksThunks = { fetchTasks, addTask, updateTask, removeTask };

// types

export type UpdateDomainTaskModelType = {
  description?: string;
  title?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};
