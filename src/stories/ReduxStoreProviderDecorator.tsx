import React from "react";
import {Provider, TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../BLL-reducers/tasks-reducer";
import {todoListsReducer} from "../BLL-reducers/todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolistsAPI";
import thunkMiddleware, {ThunkDispatch} from "redux-thunk";

const rootReducer = combineReducers({
   tasks: tasksReducer,
   todolists: todoListsReducer
})

const initialGlobalState: AppRootStateType = {
   todolists: [
      {id: 'todolistId1', title: 'What to learn', filter: 'All', addedDate: '', order: 0},
      {id: 'todolistId2', title: 'What to buy', filter: 'All', addedDate: '', order: 0}
   ],
   tasks: {
      ['todolistId1']: [
         {id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, todoListId: 'todolistId1',
            startDate: '', addedDate: '', order: 0, deadline: '', priority: TaskPriorities.Low, description: ''},
         {id: v1(), title: 'JavaScript', status: TaskStatuses.New, todoListId: 'todolistId1',
            startDate: '', addedDate: '', order: 0, deadline: '', priority: TaskPriorities.Low, description: ''}
      ],
      ['todolistId2']: [
         {id: v1(), title: 'Milk', status: TaskStatuses.Completed, todoListId: 'todolistId2',
            startDate: '', addedDate: '', order: 0, deadline: '', priority: TaskPriorities.Low, description: ''},
         {id: v1(), title: 'Bread', status: TaskStatuses.New, todoListId: 'todolistId2',
            startDate: '', addedDate: '', order: 0, deadline: '', priority: TaskPriorities.Low, description: ''}
      ]
   }
}
export const storyBookStore = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
//export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState)

export const ReduxStoreProviderDecorator = (storyFn: ()=>React.ReactNode) => {
   return <Provider store={storyBookStore}>{storyFn()}</Provider>
}