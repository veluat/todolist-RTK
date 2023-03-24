import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import EditableSpan from "./EditableSpan";

export default {
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,

    argTypes: {
        changeTitle: {
            description: 'Value EditableSpan changed'
        },
        title: {
            defaultValue: 'HTML',
            description: 'Start value of EditableSpan'
        }
    },
} as ComponentMeta<typeof EditableSpan>;

const Template3: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args}/>;

export const EditableSpanStory = Template3.bind({});
EditableSpanStory.args = {
    changeTitle: action('Value EditableSpan changed'),
};
