import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {TodoListWithRedux} from "./TodoListWithRedux";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {TodoListType} from "./App";
import {ReduxStoreProviderDecorator} from "./store/ReduxStoreProviderDecorator";
import {AppWithRedux} from "./Components/AppWithRedux/AppWithRedux";

export default {
    title: 'TODOLISTS/TodoListWithRedux',
    component: TodoListWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof TodoListWithRedux>;

const TodolistRedux = () => {
    const todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todolists)
    return <TodoListWithRedux filter={todoLists[0].filter} todoListId={'todolistId1'} title={todoLists[0].title}/>
}

const Template: ComponentStory<typeof AppWithRedux> = (args) => <TodolistRedux/>;

export const TodoListWithReduxStory = Template.bind({});

