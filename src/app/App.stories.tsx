import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {App} from "./App";
import {ReduxStoreProviderDecorator} from "../BLL-reducers/ReduxStoreProviderDecorator";

export default {
    title: 'TODOLISTS/app',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) => <App/>;

export const AppWithReduxStory = Template.bind({});

