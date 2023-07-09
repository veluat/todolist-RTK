import { AxiosResponse } from "axios/index";
import { instance, ResponseType } from "common/api/common.api";
import {
  AddTaskArgType,
  GetTasksResponse,
  RemoveTaskArgType,
  TaskType,
  TodolistType,
  UpdateTaskModelType,
  UpdateTodolistTitleArgType,
} from "features/TodolistsList/todolists.api.types";

export const todolistsApi = {
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
  updateTodolist(arg: UpdateTodolistTitleArgType) {
    return instance.put<{ title: string }, AxiosResponse<ResponseType>>(
      `todo-lists/${arg.id}`,
      { title: arg.title }
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
  deleteTask(arg: RemoveTaskArgType) {
    return instance.delete<ResponseType>(
      `todo-lists/${arg.todolistId}/tasks/${arg.taskId}`
    );
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseType<TaskType>>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
      model
    );
  },
};
