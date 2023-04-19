import {tasksReducer} from "./tasks-reducer";
import {TasksStateType} from "../App";
import {addTodolistAC, TodolistDomainType, todoListsReducer} from "./todolists-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: TodolistDomainType[] = [];
    let todolist: TodolistDomainType = {id: 'todoListId_3', title: 'new todolist', filter: 'All', order: 0, addedDate: ''}
    const action = addTodolistAC(todolist);

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolist.id);
    expect(idFromTodolists).toBe(action.todolist.id);
});

