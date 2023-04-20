import {v1} from "uuid";
import {
    addTodolistAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    FilterButtonType,
    removeTodoListAC,
    setTodolistsAC,
    TodolistDomainType,
    todoListsReducer
} from "./todolists-reducer";

let todoListId_1: string
let todoListId_2: string
let startState: TodolistDomainType[]

beforeEach(() => {
    todoListId_1 = v1()
    todoListId_2 = v1()

    startState = ([
        {id: todoListId_1, title: 'What to learn', filter: 'All', order: 0, addedDate: ''},
        {id: todoListId_2, title: 'What to buy', filter: 'All', order: 0, addedDate: ''},
    ])
})

test('correct todolist should be removed', () => {

    const endState = todoListsReducer(startState, removeTodoListAC(todoListId_1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListId_2);
});


test('correct todolist should be added', () => {

    let todolist: TodolistDomainType = {id: 'todoListId_3', title: 'New TodoList_training', filter: 'All', order: 0, addedDate: ''}

    const action = addTodolistAC(todolist)

    const endState = todoListsReducer(startState, action)

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(todolist.title);
    expect(endState[0].filter).toBe('All');
});


test('correct todolist should change its name', () => {

    let newTodolistTitle = 'New TodoList_training';

    const action = changeTodoListTitleAC(newTodolistTitle, todoListId_1)
    const endState = todoListsReducer(startState, action);

    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[1].title).toBe("What to buy");
});


test('correct filter of todolist should be changed', () => {

    let newFilter: FilterButtonType = "Completed";

    const action = changeTodoListFilterAC(todoListId_2, newFilter)

    const endState = todoListsReducer(startState, action);

    expect(endState[0].filter).toBe("All");
    expect(endState[1].filter).toBe(newFilter);
});

test('todolists should be set to the state', () => {

    const action = setTodolistsAC(startState)
    const endState = todoListsReducer([], action);

    expect(endState.length).toBe(2);
});