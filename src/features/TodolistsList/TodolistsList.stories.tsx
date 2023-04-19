import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {TodolistsList} from "./TodolistsList";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {ReduxStoreProviderDecorator} from "../../BLL-reducers/ReduxStoreProviderDecorator";
import {App} from "../../app/App";
import {TodolistDomainType} from "../../BLL-reducers/todolists-reducer";

export default {
    title: 'TODOLISTS/TodolistsList',
    component: TodolistsList,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof TodolistsList>;

const TodolistRedux = () => {
    const todoLists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
    return <TodolistsList filter={todoLists[0].filter} id={'todolistId1'} title={todoLists[0].title} addedDate='' order={0}/>
}

const Template: ComponentStory<typeof App> = (args) => <TodolistRedux/>;

export const TodoListWithReduxStory = Template.bind({});

