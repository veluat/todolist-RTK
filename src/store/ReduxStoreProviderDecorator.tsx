import React from "react";
import {AppRootStateType} from "./store";
import {Provider} from "react-redux";
import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todoListsReducer} from "./todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolistAPI";

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

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState)

export const ReduxStoreProviderDecorator = (storyFC: ()=>React.ReactNode) => {
   return <Provider store={storyBookStore}>{storyFC()}</Provider>
}