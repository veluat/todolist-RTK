import { tasksReducer, TasksStateType } from "./tasks-reducer";
import {
  TodolistDomainType,
  todoListsActions,
  todoListsReducer,
} from "./todolists-reducer";

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
  const action = todoListsActions.addTodolist({ todolist: todolist });

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todoListsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.todolist.id);
  expect(idFromTodolists).toBe(action.payload.todolist.id);
});
