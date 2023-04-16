import React, {memo, useCallback, useEffect} from "react";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import EditableSpan from "../EditableSpan/EditableSpan";
import {IconButton, List} from "@material-ui/core";
import {DeleteForeverOutlined} from "@material-ui/icons";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {addTaskTC, fetchTasksTC} from "../../store/tasks-reducer";
import {
    changeTodoListFilterAC,
    changeTodolistTitleTC,
    FilterButtonType,
    removeTodolistTC
} from "../../store/todolists-reducer";
import {FilterButton} from "../FilterButton/FilterButton";
import {Task} from "../Task/Task";
import {TaskStatuses, TaskType} from "../../api/todolistAPI";
import {TasksStateType} from "../../AppWithReducers";

export type TodoListPropsType = {
    todoListId: string
    title: string
    filter: FilterButtonType
}


export const TodoListWithRedux = memo((props: TodoListPropsType) => {

    const tasks = useAppSelector<TasksStateType>(state => state.tasks)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(props.todoListId))
    }, [])

    const changeTodoListTitle = useCallback(function(id: string, title: string) {
        dispatch(changeTodolistTitleTC(props.todoListId, title))
    }, [])

    const changeFilterHandlerCreator = useCallback((filter: FilterButtonType) => {
        dispatch(changeTodoListFilterAC(filter, props.todoListId))
    }, [dispatch, props.todoListId])

    const removeTodoList = useCallback(() => dispatch(removeTodolistTC(props.todoListId)), [])

    const addTask = useCallback(function(title: string, todolistId: string)
    {dispatch(addTaskTC(title, todolistId))}, [])

    let allTodolistTasks = tasks;
    let tasksForTodolist = allTodolistTasks;
    if (props.filter === 'Active') {
        tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.New);
    }
    if (props.filter === 'Completed') {
        tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.Completed);
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList} size='small'>
                    <DeleteForeverOutlined/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} placeholder={'add new task'}/>
            {tasksForTodolist.length
                ? <List> {
                    tasksForTodolist.map((task: TaskType) => {
                            return (
                                <Task key={task.id} task={task} todoListId={props.todoListId}/>
                            )
                        }
                    )}</List>
                : <div>Your list is empty</div>}

            <div style={{display: "flex", justifyContent: 'flex-start'}}>
                <FilterButton name={'All'} color={props.filter === 'All' ? 'secondary' : 'primary'}
                              callback={changeFilterHandlerCreator}/>
                <FilterButton name={'Active'} color={props.filter === 'Active' ? 'secondary' : 'primary'}
                              callback={changeFilterHandlerCreator}/>
                <FilterButton name={'Completed'} color={props.filter === 'Completed' ? 'secondary' : 'primary'}
                              callback={changeFilterHandlerCreator}/>
            </div>
        </div>
    );
});
