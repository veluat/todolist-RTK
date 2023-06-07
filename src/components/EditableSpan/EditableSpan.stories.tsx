import React from 'react';
import {Meta, StoryFn, StoryObj} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import EditableSpan from "./EditableSpan";

const meta: Meta<typeof EditableSpan> = {
    component: EditableSpan,
    title: 'TODOLISTS/EditableSpan',
    argTypes: {
        changeTitle: {
            description: 'Value EditableSpan changed'
        },
        title: {
            defaultValue: 'HTML',
            description: 'Start value of EditableSpan'
        }
    },
};
export default meta;

type Story = StoryObj<typeof EditableSpan>;

export const EditableSpanStory: StoryFn = (args) => {
    return (
        <div>
            <EditableSpan changeTitle={action('Value EditableSpan changed')} title={'HTML'}/>
        </div>
    )
};

