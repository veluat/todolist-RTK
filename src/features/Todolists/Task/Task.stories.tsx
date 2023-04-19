import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Task} from "./Task";
import {ReduxStoreProviderDecorator} from "../../../BLL-reducers/ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../app/store";
import {TaskType} from "../../../api/todolistsAPI";

export default {
    title: 'TODOLISTS/Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof Task>;


const TaskRedux = () => {
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0])
    const taskIsDone = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][1])
    return <>
        <Task task={task} todoListId={'todolistId1'}/>
        <Task task={taskIsDone} todoListId={'todolistId1'}/>
    </>
}

const Template: ComponentStory<typeof Task> = (args) => <TaskRedux/>;
export const TaskStory = Template.bind({})
