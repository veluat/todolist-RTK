import {v1} from "uuid";
import {FilterButtonType, TodoListType} from "../App";
import {
    AddTodoListAT,
    ChangeTodoListFilterAT,
    ChangeTodoListTitleAT, RemoveTodoListAC,
    todoListsReducer
} from "./todolists-reducer";

let todoListId_1: string
let todoListId_2: string
let startState: TodoListType[]

beforeEach(() => {
    todoListId_1 = v1()
    todoListId_2 = v1()

    startState = ([
        {id: todoListId_1, title: 'What to learn', filter: 'All'},
        {id: todoListId_2, title: 'What to buy', filter: 'All'},
    ])
})

test('correct todolist should be removed', () => {

    const endState = todoListsReducer(startState, RemoveTodoListAC(todoListId_1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListId_2);
});


test('correct todolist should be added', () => {

    let newTodolistTitle = 'New TodoList';

    const action: AddTodoListAT = {
        type: 'ADD-TODOLIST',
        title: newTodolistTitle,
        todolistId: v1()
    }
    const endState = todoListsReducer(startState, action)

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});


test('correct todolist should change its name', () => {

    let newTodolistTitle = 'New TodoList';

    const action: ChangeTodoListTitleAT = {
        type: 'CHANGE-TODOLIST-TITLE',
        title: newTodolistTitle,
        id: todoListId_1
    }
    const endState = todoListsReducer(startState, action);

    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[1].title).toBe("What to buy");
});


test('correct filter of todolist should be changed', () => {

    let newFilter: FilterButtonType = "Completed";

    const action: ChangeTodoListFilterAT = {
        type: 'CHANGE-TODOLIST-FILTER',
        filter: newFilter,
        id: todoListId_2
    }

    const endState = todoListsReducer(startState, action);

    expect(endState[0].filter).toBe("All");
    expect(endState[1].filter).toBe(newFilter);
});