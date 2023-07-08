import {} from "common/api/common.api";
import { AppThunk } from "app/store";
import { handleServerNetworkError } from "common/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { appActions } from "app/app.slice";
import { todoListsActions } from "features/TodolistsList/todolists.slice";
import { clearTasksAndTodos } from "common/actions/common.actions";
import { createAppAsyncThunk } from "common/utils";
import { handleServerAppError } from "common/utils";
import {
  AddTaskArgType,
  TaskType,
  todolistsAPI,
  UpdateTaskArgType,
  UpdateTaskModelType,
} from "features/TodolistsList/todolists.api";
import { TaskPriorities, TaskStatuses } from "common/enums";

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
    // updateTask(
    //   state,
    //   action: PayloadAction<{
    //     taskId: string;
    //     model: UpdateDomainTaskModelType;
    //     todoListId: string;
    //   }>
    // ) {
    //   const tasks = state[action.payload.todoListId];
    //   const index = tasks.findIndex((t) => t.id === action.payload.taskId);
    //   if (index > -1) {
    //     tasks[index] = { ...tasks[index], ...action.payload.model };
    //   }
    // },
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
const fetchTasks = createAppAsyncThunk<
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

const ResultCode = {
  success: 0,
  error: 1,
  captcha: 10,
} as const;

const addTask = createAppAsyncThunk<{ task: TaskType }, AddTaskArgType>(
  "tasks/addTask",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(appActions.setRequestStatus({ status: "loading" }));
      const res = await todolistsAPI.createTask(arg);
      if (res.data.resultCode === ResultCode.success) {
        const task = res.data.data.item;
        dispatch(appActions.setRequestStatus({ status: "succeeded" }));
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
      dispatch(appActions.setRequestStatus({ status: "loading" }));
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

      const res = await todolistsAPI.updateTask(
        arg.todolistId,
        arg.taskId,
        apiModel
      );
      if (res.data.resultCode === ResultCode.success) {
        dispatch(appActions.setRequestStatus({ status: "succeeded" }));
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

export const tasksSlice = slice.reducer;
export const tasksActions = slice.actions;
export const tasksThunks = { fetchTasks, addTask, updateTask };

// types

export type UpdateDomainTaskModelType = {
  description?: string;
  title?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};
