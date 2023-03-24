import React, {useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Task} from "./Task";
import {ReduxStoreProviderDecorator} from "../../store/ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {TasksType} from "../../TodoListWithRedux";

export default {
    title: 'TODOLISTS/Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof Task>;


const TaskRedux = () => {
    const task = useSelector<AppRootStateType, TasksType>(state => state.tasks['todolistId1'][0])
    return <Task task={task} todoListId={'todolistId1'}/>
}

const Template: ComponentStory<typeof Task> = (args) => <TaskRedux/>;
export const TaskStory = Template.bind({})


/*

export const TaskIsDoneStory = Template.bind({});
TaskIsDoneStory.args = {
task: {id: 'fgh45', title: 'JavaScript', isDone: true},
      todoListId: '12345'
      };

const Template2: ComponentStory<typeof Task> = (args) => <Task {...args} />;
export const TaskIsNotDoneStory = Template.bind({});
TaskIsNotDoneStory.args = {
    task: {id: 'rgb4', title: 'React-Redux', isDone: false},
    todoListId: '12345'
};
*/
