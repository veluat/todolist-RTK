import {addTaskAC, removeTaskAC, setTasksAC, tasksReducer, updateTaskAC} from './tasks-reducer'
import {TasksStateType} from '../App'
import {addTodolistAC, removeTodoListAC, setTodolistsAC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolistAPI";

let startState: TasksStateType

beforeEach(() => {
        startState = {
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses.New, todoListId: 'todolistId1',
                startDate: '', addedDate: '', order: 0, deadline: '', priority: TaskPriorities.Low, description: ''},
            {id: '2', title: 'JS', status: TaskStatuses.Completed, todoListId: 'todolistId1',
                startDate: '', addedDate: '', order: 0, deadline: '', priority: TaskPriorities.Low, description: ''},
            {id: '3', title: 'React', status: TaskStatuses.New, todoListId: 'todolistId1',
                startDate: '', addedDate: '', order: 0, deadline: '', priority: TaskPriorities.Low, description: ''}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', status: TaskStatuses.New, todoListId: 'todolistId2',
                startDate: '', addedDate: '', order: 0, deadline: '', priority: TaskPriorities.Low, description: ''},
            {id: '2', title: 'milk', status: TaskStatuses.Completed, todoListId: 'todolistId2',
                startDate: '', addedDate: '', order: 0, deadline: '', priority: TaskPriorities.Low, description: ''},
            {id: '3', title: 'tea', status: TaskStatuses.New, todoListId: 'todolistId2',
                startDate: '', addedDate: '', order: 0, deadline: '', priority: TaskPriorities.Low, description: ''}
        ]
    }
})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC('2', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses.New},
            {id: '2', title: 'JS', status: TaskStatuses.Completed},
            {id: '3', title: 'React', status: TaskStatuses.New}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', status: TaskStatuses.New},
            {id: '2', title: 'tea', status: TaskStatuses.New}
        ]
    })
})

test('correct task should be added to correct array', () => {

    const action = addTaskAC({
        todoListId: "todolistId2",
        title: 'juce',
        status: TaskStatuses.New,
        addedDate: '',
        order: 0,
        deadline: '',
        priority: 0,
        description: '',
        startDate: '',
        id: 'id exists'
    });

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe('juce');
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})

test('status of specified task should be changed', () => {

    const action = updateTaskAC('2', {status: TaskStatuses.New}, 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
})


test('title of specified task should be changed', () => {

    const action = updateTaskAC('2', {title: 'water'}, 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].title).toBe('JS');
    expect(endState["todolistId2"][1].title).toBe('water');
})

test('new array should be added when new todolist is added', () => {

    const action = addTodolistAC({
        id: '12345',
        title: 'new todolistId',
        order: 0,
        addedDate: ''
    })

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {

    const action = removeTodoListAC('todolistId2');
    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined();
})

test('empty arrays should be added when we set todolists', () => {

    const action = setTodolistsAC([
            {id: '1', title: 'title 1', order: 0, addedDate: ''},
            {id: '2', title: 'title 2', order: 0, addedDate: ''}
        ]);
    const endState = tasksReducer({}, action);

    const keys = Object.keys(endState);

    expect(keys.length).toBe(2)
    expect(endState['1']).not.toStrictEqual([]);
    expect(endState['2']).not.toStrictEqual([]);
})

test('tasks should be added for todolist', () => {

    const action = setTasksAC(startState['todolistId1'], 'todolistId1');
    const endState = tasksReducer({
        'todolistId2': [],
        'todolistId1': [],
    }, action);

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(0)
})