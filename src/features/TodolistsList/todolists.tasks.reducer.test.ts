import { tasksSlice, TasksStateType } from "features/TodolistsList/tasks.slice";
import {
  TodolistDomainType,
  todolistsActions,
  todolistsSlice,
  todolistsThunks,
} from "features/TodolistsList/todolists.slice";

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: TodolistDomainType[] = [];
  let todolist: TodolistDomainType = {
    id: "todoListId_3",
    title: "new todolist",
    filter: "All",
    entityStatus: "idle",
    order: 0,
    addedDate: "",
  };
  const action = todolistsThunks.addTodolist.fulfilled(
    { todolist: todolist },
    "requestId",
    todolist.title
  );

  const endTasksState = tasksSlice(startTasksState, action);
  const endTodolistsState = todolistsSlice(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.todolist.id);
  expect(idFromTodolists).toBe(action.payload.todolist.id);
});
