import React from 'react';

type PropsType = {
    name: string
    callback: () => void
}

export const Button = (props: PropsType) => {
    const {name, callback} = props
    const onClickHandler = () => {
        callback()
    }
    return (
        <button onClick={onClickHandler}>{name}</button>
    )
}