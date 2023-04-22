import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";
import {Todolist} from "../features/TodolistsList/Todolists/Todolist";
import {action} from "@storybook/addon-actions";
import {TaskStatuses} from "../api/todolistsAPI";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";

export default {
    title: 'TODOLISTS/Todolist',
    component: TodolistsList,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof TodolistsList>

const changeTodolistTitleCallback = action('Title changed')
const changeTaskStatusCallback = action('Status changed')
const changeTaskTitleCallback = action('Tasks title changed')
const changeFilterCallback = action('Filter changed')
const removeTaskCallback = action('Task removed')
const addTaskCallback = action('Task was added')
const removeTodolistCallback = action('Todolist removed')

export const TodolistExemple = (props: any) => {
    return (
        <div>
            <Todolist id={'todolistId1'} title={'What to learn'} tasks={[{
                id: '1', status: TaskStatuses.Completed, title: 'JavaScript', addedDate: '',
                order: 0, deadline: '', priority: 0, startDate: '', description: '', todoListId: 'todolistId1'
            },
                {
                    id: '21', status: TaskStatuses.New, title: 'React-Redux', addedDate: '',
                    order: 0, deadline: '', priority: 0, startDate: '', description: '', todoListId: 'todolistId1'
                }]} changeFilter={changeFilterCallback} addTask={addTaskCallback}
                      changeTaskStatus={changeTaskStatusCallback} changeTaskTitle={changeTaskTitleCallback}
                      removeTask={removeTaskCallback} removeTodolist={removeTodolistCallback}
                      changeTodolistTitle={changeTodolistTitleCallback} filter={'All'}/>
        </div>
    )
}

 const Template: ComponentStory<typeof Todolist> = (args) => <Todolist {...args}/>;
 export const TodolistStory = Template.bind({});

/*
const TodolistRedux = () => {
    const changeTodolistTitleCallback = useAppDispatch(changeTodolistTitleTC(todoLists))
    const changeTaskStatusCallback = action('Status changed')
    const changeTaskTitleCallback = action('Tasks title changed')
    const changeFilterCallback = action('Filter changed')
    const removeTaskCallback = action('Task removed')
    const addTaskCallback = action('Task was added')
    const removeTodolistCallback = action('Todolist removed')

    const todoLists = useAppSelector<TodolistDomainType[]>(state => state.todolists)
    const tasks = useAppSelector<TaskType[]>(state => state.tasks.todoLists)

    return <Todolist filter={todoLists[0].filter} tasks={tasks} title={todoLists[0].title}
                     changeFilter={changeFilterCallback} addTask={addTaskCallback}
                     changeTaskStatus={changeTaskStatusCallback} changeTaskTitle={changeTaskTitleCallback}
                     removeTask={removeTaskCallback} removeTodolist={removeTodolistCallback}
                     changeTodolistTitle={changeTodolistTitleCallback} id={todoLists[0].id}
    />;
}
const Template: ComponentStory<typeof Todolist> = (args) => <TodolistRedux/>;

export const TodoListWithReduxStory = Template.bind({});
TodoListWithReduxStory.args = {}
*/
