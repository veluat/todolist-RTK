import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Meta, StoryFn, StoryObj} from '@storybook/react';
import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions";
import EditableSpan from "../EditableSpan/EditableSpan";
import {Button, TextField} from "@mui/material";
import {AddBoxOutlined} from "@mui/icons-material";

const meta: Meta<typeof AddItemForm> = {
    component: AddItemForm,
    title: 'TODOLISTS/AddItemForm',
    argTypes: {
        addItem: {
            description: 'Button clicked inside form'
        }
    },
};
export default meta;

type Story = StoryObj<typeof EditableSpan>;

export const AddItemFormStory: StoryFn = (args) => {
    return (
        <div>
            <AddItemForm addItem={action('Button clicked inside form')} placeholder={''}/>
        </div>
    )
};

export const AddItemFormDisabledExample: StoryFn = (args) => {
    return (
        <div>
            <AddItemForm addItem={action('Button clicked inside form')} disabled={true}
                          placeholder={''}/>
        </div>
    )
};

export const AddItemFormErrorInputStory: StoryFn = (args) => {
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
                helperText={error && 'Title is required'}
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
};
