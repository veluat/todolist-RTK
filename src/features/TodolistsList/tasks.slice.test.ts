import {
  tasksSlice,
  TasksStateType,
  tasksThunks,
} from "features/TodolistsList/tasks.slice";

import { todolistsThunks } from "features/TodolistsList/todolists.slice";
import { TaskPriorities, TaskStatuses } from "common/enums";

let startState: TasksStateType;

beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatuses.New,
        todoListId: "todolistId1",
        startDate: "",
        addedDate: "",
        order: 0,
        deadline: "",
        priority: TaskPriorities.Low,
        description: "",
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatuses.Completed,
        todoListId: "todolistId1",
        startDate: "",
        addedDate: "",
        order: 0,
        deadline: "",
        priority: TaskPriorities.Low,
        description: "",
      },
      {
        id: "3",
        title: "React",
        status: TaskStatuses.New,
        todoListId: "todolistId1",
        startDate: "",
        addedDate: "",
        order: 0,
        deadline: "",
        priority: TaskPriorities.Low,
        description: "",
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        status: TaskStatuses.New,
        todoListId: "todolistId2",
        startDate: "",
        addedDate: "",
        order: 0,
        deadline: "",
        priority: TaskPriorities.Low,
        description: "",
      },
      {
        id: "2",
        title: "milk",
        status: TaskStatuses.Completed,
        todoListId: "todolistId2",
        startDate: "",
        addedDate: "",
        order: 0,
        deadline: "",
        priority: TaskPriorities.Low,
        description: "",
      },
      {
        id: "3",
        title: "tea",
        status: TaskStatuses.New,
        todoListId: "todolistId2",
        startDate: "",
        addedDate: "",
        order: 0,
        deadline: "",
        priority: TaskPriorities.Low,
        description: "",
      },
    ],
  };
});

test("correct task should be deleted from correct array", () => {
  const action = tasksThunks.removeTask.fulfilled(
    {
      todolistId: "todolistId2",
      taskId: "2",
    },
    "reguestId",
    { taskId: "", todolistId: "" }
  );

  const endState = tasksSlice(startState, action);

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(2);
  expect(endState["todolistId2"].every((t) => t.id != "2")).toBeTruthy();
});

test("correct task should be added to correct array", () => {
  const task = {
    todoListId: "todolistId2",
    title: "juce",
    status: TaskStatuses.New,
    addedDate: "",
    order: 0,
    deadline: "",
    priority: 0,
    description: "",
    startDate: "",
    id: "id exists",
  };
  const action = tasksThunks.addTask.fulfilled({ task }, "reguestId", {
    title: task.title,
    todolistId: task.todoListId,
  });

  const endState = tasksSlice(startState, action);

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(4);
  expect(endState["todolistId2"][0].id).toBeDefined();
  expect(endState["todolistId2"][0].title).toBe("juce");
  expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
});

test("status of specified task should be changed", () => {
  const args = {
    taskId: "2",
    domainModel: { status: TaskStatuses.New },
    todolistId: "todolistId2",
  };
  const action = tasksThunks.updateTask.fulfilled(args, "reqestId", args);

  const endState = tasksSlice(startState, action);

  expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
  expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
});

test("title of specified task should be changed", () => {
  const args = {
    taskId: "2",
    domainModel: { title: "water" },
    todolistId: "todolistId2",
  };
  const action = tasksThunks.updateTask.fulfilled(args, "reqestId", args);

  const endState = tasksSlice(startState, action);

  expect(endState["todolistId1"][1].title).toBe("JS");
  expect(endState["todolistId2"][1].title).toBe("water");
});

test("new array should be added when new todolist is added", () => {
  const todolist = {
    id: "blabla",
    title: "new todolist",
    order: 0,
    addedDate: "",
  };
  const action = todolistsThunks.addTodolist.fulfilled(
    { todolist },
    "requestId",
    todolist.title
  );

  const endState = tasksSlice(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k != "todolistId1" && k != "todolistId2");
  if (!newKey) {
    throw Error("new key should be added");
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test("property with todolistId should be deleted", () => {
  const id = "todolistId2";
  const action = todolistsThunks.removeTodolist.fulfilled(
    { id },
    "requestId",
    id
  );
  const endState = tasksSlice(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).not.toBeDefined();
});

test("empty arrays should be added when we set todolists", () => {
  const action = todolistsThunks.fetchTodolists.fulfilled(
    {
      todolists: [
        { id: "1", title: "title 1", order: 0, addedDate: "" },
        { id: "2", title: "title 2", order: 0, addedDate: "" },
      ],
    },
    "requestId"
  );
  const endState = tasksSlice({}, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(2);
  expect(endState["1"]).toStrictEqual([]);
  expect(endState["2"]).toStrictEqual([]);
});

test("tasks should be added for todolist", () => {
  const action = tasksThunks.fetchTasks.fulfilled(
    {
      todolistId: "todolistId1",
      tasks: startState["todolistId1"],
    },
    "requestId",
    "todolistId1"
  );
  const endState = tasksSlice(
    {
      todolistId2: [],
      todolistId1: [],
    },
    action
  );

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(0);
});
