import { TaskPriorities, TaskStatuses } from "common/enums";
import { UpdateDomainTaskModelType } from "features/TodolistsList/tasks.slice";

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
export type GetTasksResponse = {
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
export type RemoveTaskArgType = {
  taskId: string;
  todolistId: string;
};

export type UpdateTodolistTitleArgType = {
  id: string;
  title: string;
};
