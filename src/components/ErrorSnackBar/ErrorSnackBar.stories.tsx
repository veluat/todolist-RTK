import {Meta, StoryFn, StoryObj} from "@storybook/react";
import {ErrorSnackBar} from "./ErrorSnackBar";
import {Alert, Snackbar} from "@mui/material";
import React from "react";

const meta: Meta<typeof ErrorSnackBar> = {
    component: ErrorSnackBar,
    title: 'TODOLISTS/ErrorSnackBar'
};
export default meta;

type Story = StoryObj<typeof ErrorSnackBar>;

export const ErrorSnackBarStory: StoryFn = (args) => {
    const error = 'Something is going wrong. Please try later.';
    return (
        <Snackbar open={true}>
            <Alert severity="error" sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    )
}
