import React, {memo, useCallback} from "react";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import EditableSpan from "../EditableSpan/EditableSpan";
import {IconButton, List} from "@material-ui/core";
import {DeleteForeverOutlined} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {addTaskAC} from "../../store/tasks-reducer";
import {
    ChangeTodoListFilterAT,
    ChangeTodoListTitleAT,
    FilterButtonType,
    RemoveTodoListAC
} from "../../store/todolists-reducer";
import {FilterButton} from "../FilterButton/FilterButton";
import {Task} from "../Task/Task";
import {TaskStatuses, TaskType} from "../../api/todolistAPI";

export type TodoListPropsType = {
    todoListId: string
    title: string
    filter: FilterButtonType
}


export const TodoListWithRedux = memo((props: TodoListPropsType) => {

    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.todoListId])

    const dispatch = useDispatch()

    const changeTodoListTitle = useCallback((title: string) => {
        dispatch(ChangeTodoListTitleAT(title, props.todoListId))
    }, [dispatch, props.todoListId])

    const changeFilterHandlerCreator = useCallback((filter: FilterButtonType) => {
        dispatch(ChangeTodoListFilterAT(filter, props.todoListId))
    }, [dispatch, props.todoListId])

    const removeTodoList = () => dispatch(RemoveTodoListAC(props.todoListId))

    const addTask = useCallback((title: string) => dispatch(addTaskAC(title, props.todoListId)), [dispatch, props.todoListId])

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
