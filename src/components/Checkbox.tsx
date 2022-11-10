import React, {ChangeEvent} from 'react';

type PropsType = {
    checked: boolean
    callBack: (isDone: boolean) => void
}

export const Checkbox = (props: PropsType) => {


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callBack(e.currentTarget.checked)
    }

    return (
    <input type="checkbox" checked={props.checked} onChange={onChangeHandler}/>

    /*<input type="checkbox" checked={props.checked}
           onChange={(event: ChangeEvent<HTMLInputElement>) => onChangeHandler(t.id, event.currentTarget.checked)}/>*/
    )
};

