import React from "react";
import {Button} from "@material-ui/core";

type FilterButtonPropsType = {
    name: "All" | "Active" | "Completed"
    color: 'secondary' | 'primary'
    callback: (name: "All" | "Active" | "Completed") => void
}

export const FilterButton: React.FC<FilterButtonPropsType> = React.memo(({color, callback, name}) => {
    console.log('Button')
    return (
        <Button
            style={{marginRight: '3px'}}
            variant='contained'
            color={color}
            size='small'
            disableElevation
            onClick={() => {callback(name)}}
        >{name}</Button>
    )
})