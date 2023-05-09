import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions";
import {Button, TextField} from "@mui/material";
import {AddBoxOutlined} from "@mui/icons-material";

export default {
    title: 'TODOLISTS/AddItemForm',
    component: AddItemForm,

    argTypes: {
        addItem: {
            description: 'Button clicked inside form'
        }
    },
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args}/>;

export const AddItemFormStory = Template.bind({});
AddItemFormStory.args = {
    addItem: action('Button clicked inside form')
};

const Template1: ComponentStory<typeof AddItemForm> = (args) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(true)

    const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const onClickAddItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            args.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onKeyDownEnterAddItem = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && onClickAddItem()
    return (
        <div>
            <TextField
                size='small'
                variant='outlined'
                value={title}
                onChange={onChangeSetLocalTitle}
                onKeyDown={onKeyDownEnterAddItem}
                label={args.placeholder}
                error={error}
                helperText={error &&'Title is required'}
            />
            <Button onClick={onClickAddItem}
                    size='small'
                    variant='contained'
                    color='primary'
                    style={{'marginLeft': '3px', 'marginTop': '5px'}}
                    endIcon={<AddBoxOutlined/>}>ADD
            </Button>
        </div>
    );
}

export const AddItemFormErrorStory = Template1.bind({});
