import { AxiosResponse } from "axios/index";
import {
  instance,
  ResponseType,
  TaskPriorities,
  TaskStatuses,
} from "common/api/common.api";
import { UpdateDomainTaskModelType } from "features/TodolistsList/tasks.slice";

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

export type UserType = {
  id: number;
  email: string;
  login: string;
};

export type TodolistType = {
  addedDate: string;
  id: string;
  order: number;
  title: string;
};

export type TaskType = {
  description: string;
  title: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};
export type UpdateTaskModelType = {
  description: string;
  title: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
};
type GetTasksResponse = {
  items: TaskType[];
  totalCount: number;
  error: string | null;
};

export type AddTaskArgType = {
  todolistId: string;
  title: string;
};
export type UpdateTaskArgType = {
  taskId: string;
  domainModel: UpdateDomainTaskModelType;
  todolistId: string;
};
