import {v1} from "uuid";
import {FilterButtonType, TodoListType} from "../App";
import {
    AddTodoListAT,
    ChangeTodoListFilterAT,
    ChangeTodoListTitleAT, RemoveTodoListAC,
    todoListsReducer
} from "./todolists-reducer";

test('correct todolist should be removed', () => {
    //
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const startState: TodoListType[] = ([
        {id: todoListId_1, title: 'What to learn', filter: 'All'},
        {id: todoListId_2, title: 'What to buy', filter: 'All'},
    ])
    //

    //const action: RemoveTodoListAT = RemoveTodoListAC(todoListId_1)

    const endState = todoListsReducer(startState, RemoveTodoListAC(todoListId_1))
    //
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListId_2);
});


test('correct todolist should be added', () => {
    //
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const startState: TodoListType[] = ([
        {id: todoListId_1, title: 'What to learn', filter: 'All'},
        {id: todoListId_2, title: 'What to buy', filter: 'All'},
    ])

    let newTodolistTitle = 'New TodoList';
    //
    const action: AddTodoListAT = {
        type: 'ADD-TODOLIST',
        title: newTodolistTitle,
        todolistId: v1()
    }
    const endState = todoListsReducer(startState, action)
    //
    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});


test('correct todolist should change its name', () => {
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    let newTodolistTitle = 'New TodoList';

    const startState: TodoListType[] = ([
        {id: todoListId_1, title: 'What to learn', filter: 'All'},
        {id: todoListId_2, title: 'What to buy', filter: 'All'},
    ])

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
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const startState: TodoListType[] = ([
        {id: todoListId_1, title: 'What to learn', filter: 'All'},
        {id: todoListId_2, title: 'What to buy', filter: 'All'},
    ])

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