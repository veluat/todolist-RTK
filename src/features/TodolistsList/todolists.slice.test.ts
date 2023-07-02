import { v1 } from "uuid";
import {
  FilterButtonType,
  TodolistDomainType,
  todoListsActions,
  todolistsSlice,
} from "features/TodolistsList/todolists.slice";
import { RequestStatusType } from "app/app.slice";

let todoListId_1: string;
let todoListId_2: string;
let startState: TodolistDomainType[];

beforeEach(() => {
  todoListId_1 = v1();
  todoListId_2 = v1();

  startState = [
    {
      id: todoListId_1,
      title: "What to learn",
      filter: "All",
      entityStatus: "idle",
      order: 0,
      addedDate: "",
    },
    {
      id: todoListId_2,
      title: "What to buy",
      filter: "All",
      entityStatus: "idle",
      order: 0,
      addedDate: "",
    },
  ];
});

test("correct todolist should be removed", () => {
  const endState = todolistsSlice(
    startState,
    todoListsActions.removeTodoList({ id: todoListId_1 })
  );

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todoListId_2);
});

test("correct todolist should be added", () => {
  let todolist: TodolistDomainType = {
    id: "todoListId_3",
    title: "New TodoList_training",
    filter: "All",
    entityStatus: "idle",
    order: 0,
    addedDate: "",
  };

  const action = todoListsActions.addTodolist({ todolist: todolist });

  const endState = todolistsSlice(startState, action);

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(todolist.title);
  expect(endState[0].filter).toBe("All");
});

test("correct todolist should change its name", () => {
  let newTodolistTitle = "New TodoList_training";

  const action = todoListsActions.changeTodoListTitle({
    id: todoListId_1,
    title: newTodolistTitle,
  });
  const endState = todolistsSlice(startState, action);

  expect(endState[0].title).toBe(newTodolistTitle);
  expect(endState[1].title).toBe("What to buy");
});

test("correct filter of todolist should be changed", () => {
  let newFilter: FilterButtonType = "Completed";

  const action = todoListsActions.changeTodoListFilter({
    id: todoListId_2,
    filter: newFilter,
  });

  const endState = todolistsSlice(startState, action);

  expect(endState[0].filter).toBe("All");
  expect(endState[1].filter).toBe(newFilter);
});

test("todolists should be set to the state", () => {
  const action = todoListsActions.setTodolists({ todolists: startState });
  const endState = todolistsSlice([], action);

  expect(endState.length).toBe(2);
});

test("correct entity status of todolist should be changed", () => {
  let newStatus: RequestStatusType = "loading";

  const action = todoListsActions.changeTodoListEntityStatus({
    entityStatus: newStatus,
    id: todoListId_2,
  });

  const endState = todolistsSlice(startState, action);

  expect(endState[0].entityStatus).toBe("idle");
  expect(endState[1].entityStatus).toBe(newStatus);
});
