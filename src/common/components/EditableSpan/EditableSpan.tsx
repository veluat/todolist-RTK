import React, { ChangeEvent, KeyboardEvent, memo, useState } from "react";
import TextField from "@mui/material/TextField";

type EditableSpanPropsType = {
  title: string;
  changeTitle: (newTitle: string) => void;
};

const EditableSpan = memo((props: EditableSpanPropsType) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [title, setTitle] = useState(props.title);

  const onEditMode = () => {
    setIsEditMode(true);
  };
  const offEditMode = () => {
    props.changeTitle(title);
    setIsEditMode(false);
  };
  const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const onKeyDownEnterAddItem = (e: KeyboardEvent<HTMLInputElement>) =>
    e.key === "Enter" && offEditMode();
  return isEditMode ? (
    <TextField
      value={title}
      onBlur={offEditMode}
      size="small"
      autoFocus
      onChange={onChangeSetLocalTitle}
      onKeyDown={onKeyDownEnterAddItem}
    />
  ) : (
    <span onDoubleClick={onEditMode}>{props.title}</span>
  );
});

export default EditableSpan;
