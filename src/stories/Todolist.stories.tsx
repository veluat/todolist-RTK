import React from 'react';
import {Meta, StoryFn, StoryObj} from '@storybook/react';
import {Todolist} from "../features/TodolistsList/Todolists/Todolist";
import {action} from "@storybook/addon-actions";
import {TaskStatuses} from "../api/todolistsAPI";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

const meta: Meta<typeof Todolist> = {
    component: Todolist,
    title: 'TODOLISTS/Todolist',
    decorators: [ReduxStoreProviderDecorator]
};
export default meta;

type Story = StoryObj<typeof Todolist>;

const changeTodolistTitleCallback = action('Title changed')
const changeTaskStatusCallback = action('Status changed')
const changeTaskTitleCallback = action('Tasks title changed')
const changeFilterCallback = action('Filter changed')
const removeTaskCallback = action('Task removed')
const addTaskCallback = action('Task was added')
const removeTodolistCallback = action('Todolist removed')

export const TodolistExample: StoryFn = (args) => {
    return (
        <div>
            <Todolist todolist={{
                id: 'todolistId1',
                title: 'What to learn',
                addedDate: '',
                order: 0,
                filter: "All",
                entityStatus: 'idle'
            }} tasks={[{
                id: '1', status: TaskStatuses.Completed, title: 'JavaScript', addedDate: '',
                order: 0, deadline: '', priority: 0, startDate: '', description: '', todoListId: 'todolistId1'
            },
                {
                    id: '21', status: TaskStatuses.New, title: 'React-Redux', addedDate: '',
                    order: 0, deadline: '', priority: 0, startDate: '', description: '', todoListId: 'todolistId1'
                }]} changeFilter={changeFilterCallback} addTask={addTaskCallback}
                      changeTaskStatus={changeTaskStatusCallback} changeTaskTitle={changeTaskTitleCallback}
                      removeTask={removeTaskCallback} removeTodolist={removeTodolistCallback}
                      changeTodolistTitle={changeTodolistTitleCallback} demo={true}/>
        </div>
    )
}
