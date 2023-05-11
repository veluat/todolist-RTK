import React from 'react';
import {ComponentMeta, Meta, StoryObj} from '@storybook/react';
import {Task} from "../features/TodolistsList/Todolists/Task/Task";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";
import {TaskStatuses} from "../api/todolistsAPI";
import {action} from "@storybook/addon-actions";
import {App} from "../app/App";

const meta: Meta<typeof Task> = {
    component: Task,
    title: 'TODOLISTS/Task', decorators: [ReduxStoreProviderDecorator]
};
export default meta;

type Story = StoryObj<typeof Task>;

const changeTaskTitleCallback = action('Title changed')
const changeTaskStatusCallback = action('Status changed')
const removeTaskCallback = action('Task removed')

export const TaskExample = (props: any) => {
    return (
        <div>
            <Task task={{
                id: '1', status: TaskStatuses.Completed, title: 'JavaScript', addedDate: '',
                order: 0, deadline: '', priority: 0, startDate: '', description: '', todoListId: 'todolistId1'
            }}
                  todolistId={'todolistId1'}
                  changeTaskStatus={changeTaskStatusCallback}
                  changeTaskTitle={changeTaskTitleCallback}
                  removeTask={removeTaskCallback}/>
            <Task task={{
                id: '1', status: TaskStatuses.New, title: 'React-Redux', addedDate: '',
                order: 0, deadline: '', priority: 0, startDate: '', description: '', todoListId: 'todolistId1'
            }}
                  todolistId={'todolistId1'}
                  changeTaskStatus={changeTaskStatusCallback}
                  changeTaskTitle={changeTaskTitleCallback}
                  removeTask={removeTaskCallback}/>
        </div>
    )
}
