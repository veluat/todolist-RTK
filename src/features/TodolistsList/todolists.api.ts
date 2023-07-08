import { AxiosResponse } from "axios/index";
import { instance, ResponseType } from "common/api/common.api";
import { UpdateDomainTaskModelType } from "features/TodolistsList/tasks.slice";
import { TaskPriorities, TaskStatuses } from "common/enums";
import {
  AddTaskArgType,
  GetTasksResponse,
  TaskType,
  TodolistType,
  UpdateTaskModelType,
} from "features/TodolistsList/todolists.api.types";

export const todolistsAPI = {
  getTodolists() {
    return instance.get<TodolistType[]>(`todo-lists`);
  },
  createTodolist(title: string) {
    return instance.post<
      ResponseType<{ item: TodolistType }>,
      AxiosResponse<ResponseType<{ item: TodolistType }>>,
      { title: string }
    >(`todo-lists`, { title });
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
  },
  updateTodolist(todolistId: string, title: string) {
    return instance.put<{ title: string }, AxiosResponse<ResponseType>>(
      `todo-lists/${todolistId}`,
      { title }
    );
  },
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
  },
  createTask(arg: AddTaskArgType) {
    return instance.post<ResponseType<{ item: TaskType }>>(
      `todo-lists/${arg.todolistId}/tasks`,
      { title: arg.title }
    );
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(
      `todo-lists/${todolistId}/tasks/${taskId}`
    );
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseType<TaskType>>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
      model
    );
  },
};
