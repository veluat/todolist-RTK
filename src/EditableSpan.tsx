import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    changeTitle: (nextTitle: string) => void
}

const EditableSpan = (props: EditableSpanPropsType) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(true)
    const [title, setTitle] = useState(props.title)

    const onEditMode = () => {
        setIsEditMode(true)
    }
    const offEditMode = () => {
        props.changeTitle(title)
        setIsEditMode(false)
    }
    const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        /*error && setError(false)*/
        setTitle(e.currentTarget.value)
    }
    const onKeyDownEnterAddItem = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && offEditMode()
    return (
        isEditMode
        ? <input value={title} onBlur={offEditMode} autoFocus onChange={onChangeSetLocalTitle} onKeyDown={onKeyDownEnterAddItem}/>
        : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
};

export default EditableSpan;