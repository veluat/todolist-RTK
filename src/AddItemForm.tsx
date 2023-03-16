import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {AddBoxOutlined} from "@material-ui/icons";
import {Button, TextField} from "@material-ui/core";

type AddItemFormPropsType = {
    addItem: (title: string) => void
    placeholder: string
}

export const AddItemForm = memo((props: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const onClickAddItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
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
                label={props.placeholder}
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
});

