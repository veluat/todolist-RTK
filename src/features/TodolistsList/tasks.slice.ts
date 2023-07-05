import {
  TaskPriorities,
  TaskStatuses,
  TaskType,
  todolistsAPI,
  UpdateTaskModelType,
} from "api/todolistsAPI";
import { AppDispatch, AppRootStateType, AppThunk } from "app/store";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "utils/error.utils";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { appActions } from "app/app.slice";
import { todoListsActions } from "features/TodolistsList/todolists.slice";
import { clearTasksAndTodos } from "common/actions/common.actions";
import { createAppAsyncThunk } from "utils/create-app-async-thunk";

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

const slice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: {
    removeTask(
      state,
      action: PayloadAction<{ taskId: string; todolistId: string }>
    ) {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex((t) => t.id === action.payload.taskId);
      if (index > -1) {
        tasks.splice(index, 1);
      }
    },
    /* _addTask(state, action: PayloadAction<{ task: TaskType }>) {
      state[action.payload.task.todoListId].unshift(action.payload.task);
    },*/
    updateTask(
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
    /*setTasks(
                      state,
                      action: PayloadAction<{ tasks: TaskType[]; todolistId: string }>
                    ) {
                      state[action.payload.todolistId] = action.payload.tasks;
                    },*/
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks;
      })
      .addCase(
        addTask.fulfilled,
        (state, action: PayloadAction<{ task: TaskType }>) => {
          state[action.payload.task.todoListId].unshift(action.payload.task);
        }
      )
      .addCase(todoListsActions.addTodolist, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(todoListsActions.removeTodoList, (state, action) => {
        delete state[action.payload.id];
      })
      .addCase(todoListsActions.setTodolists, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state[tl.id] = [];
        });
      })
      .addCase(clearTasksAndTodos, () => {
        return {};
      });
  },
});

// thunks
export const fetchTasks = createAppAsyncThunk<
  {
    tasks: TaskType[];
    todolistId: string;
  },
  string
>("tasks/fetchTasks", async (todolistId, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    dispatch(appActions.setRequestStatus({ status: "loading" }));
    const res = await todolistsAPI.getTasks(todolistId);
    const tasks = res.data.items;
    dispatch(appActions.setRequestStatus({ status: "succeeded" }));
    return { tasks, todolistId };
  } catch (e) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  }
});

export const removeTaskTC =
  (taskId: string, todolistId: string): AppThunk =>
  (dispatch) => {
    dispatch(appActions.setRequestStatus({ status: "loading" }));
    todolistsAPI
      .deleteTask(todolistId, taskId)
      .then(() => {
        dispatch(tasksActions.removeTask({ taskId, todolistId }));
        dispatch(appActions.setRequestStatus({ status: "succeeded" }));
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };

export const addTask = createAppAsyncThunk<
  {
    title: string;
    todolistId: string;
  },
  string
>("tasks/addTask", async ({ todolistId, title }, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    dispatch(appActions.setRequestStatus({ status: "loading" }));
    const tasks = await todolistsAPI.createTask(todolistId, title);
    if (tasks.data.resultCode === 0) {
      dispatch(todolistsAPI.createTask({ task: tasks.data.data.item }));
    }
    dispatch(appActions.setRequestStatus({ status: "succeeded" }));
    return { tasks };
  } catch (e) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  }
});

export const _addTaskTC =
  (title: string, todolistId: string): AppThunk =>
  (dispatch) => {
    dispatch(appActions.setRequestStatus({ status: "loading" }));
    todolistsAPI
      .createTask(todolistId, title)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(tasksActions.addTask({ task: res.data.data.item }));
        } else {
          handleServerAppError(res.data, dispatch);
        }
        dispatch(appActions.setRequestStatus({ status: "succeeded" }));
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };

export const updateTaskTC =
  (
    taskId: string,
    model: UpdateDomainTaskModelType,
    todolistId: string
  ): AppThunk =>
  (dispatch, getState: () => AppRootStateType) => {
    dispatch(appActions.setRequestStatus({ status: "loading" }));
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
            tasksActions.updateTask({
              taskId: taskId,
              todoListId: todolistId,
              model,
            })
          );
          dispatch(appActions.setRequestStatus({ status: "succeeded" }));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };

export const tasksSlice = slice.reducer;
export const tasksActions = slice.actions;
export const tasksThunks = { fetchTasks };

// types

export type UpdateDomainTaskModelType = {
  description?: string;
  title?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};
