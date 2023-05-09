import React from 'react';
import {ComponentMeta} from '@storybook/react';
import {Task} from "../features/TodolistsList/Todolists/Task/Task";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";
import {TaskStatuses} from "../api/todolistsAPI";
import {action} from "@storybook/addon-actions";

export default {
    title: 'TODOLISTS/Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof Task>;

const changeTaskTitleCallback = action('Title changed')
const changeTaskStatusCallback = action('Status changed')
const removeTaskCallback = action('Task removed')

export const TaskBaseExemple = (props: any) => {
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

// const changeTaskTitleCallback = action('Title changed')
// const changeTaskStatusCallback = action('Status changed')
// const removeTaskCallback = action('Task removed')
//
// const TaskRedux = () => {
//     const task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0])
//     const taskIsDone = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][1])
//     return <>
//         <Task task={task} todolistId={'todolistId1'} changeTaskTitle={changeTaskTitleCallback}
//               changeTaskStatus={changeTaskStatusCallback} removeTask={removeTaskCallback}/>
//         <Task task={taskIsDone} todolistId={'todolistId1'} changeTaskTitle={changeTaskTitleCallback}
//               changeTaskStatus={changeTaskStatusCallback} removeTask={removeTaskCallback}/>
//     </>
// }
//
// const Template: ComponentStory<typeof Task> = (args) => <TaskRedux/>;
// export const TaskStory = Template.bind({});