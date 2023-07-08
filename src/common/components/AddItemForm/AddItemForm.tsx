import React, { ChangeEvent, KeyboardEvent, memo, useState } from "react";
import AddBoxOutlined from "@mui/icons-material/AddBoxOutlined";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
  placeholder: string;
  disabled?: boolean;
};

export const AddItemForm = memo(
  ({ addItem, disabled = false, placeholder }: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
      error && setError(false);
      setTitle(e.currentTarget.value);
    };
    const onClickAddItem = () => {
      if (title.trim() !== "") {
        addItem(title);
      } else {
        setError(true);
      }
      setTitle("");
    };
    const onKeyDownEnterAddItem = (e: KeyboardEvent<HTMLInputElement>) =>
      e.key === "Enter" && onClickAddItem();
    return (
      <div>
        <TextField
          disabled={disabled}
          size="small"
          variant="outlined"
          value={title}
          onChange={onChangeSetLocalTitle}
          onKeyDown={onKeyDownEnterAddItem}
          label={placeholder}
          error={error}
          helperText={error && "Title is required"}
        />
        <Button
          onClick={onClickAddItem}
          disabled={disabled}
          size="small"
          variant="contained"
          color="primary"
          style={{ marginLeft: "3px", marginTop: "5px" }}
          endIcon={<AddBoxOutlined />}
        >
          ADD
        </Button>
      </div>
    );
  }
);
