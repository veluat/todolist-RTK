import React from "react";
import {AppRootStateType} from "./store";
import {Provider} from "react-redux";
import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todoListsReducer} from "./todolists-reducer";
import {v1} from "uuid";

const rootReducer = combineReducers({
   tasks: tasksReducer,
   todolists: todoListsReducer
})

const initialGlobalState = {
   todolists: [
      {id: 'todolistId1', title: 'What to learn', filter: 'All'},
      {id: 'todolistId2', title: 'What to buy', filter: 'All'}
   ],
   tasks: {
      ['todolistId1']: [
         {id: v1(), title: 'HTML&CSS', isDone: false},
         {id: v1(), title: 'JavaScript', isDone: true}
      ],
      ['todolistId2']: [
         {id: v1(), title: 'Milk', isDone: true},
         {id: v1(), title: 'Bread', isDone: false}
      ]
   }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType)

export const ReduxStoreProviderDecorator = (storyFC: ()=>React.ReactNode) => {
   return <Provider store={storyBookStore}>{storyFC()}</Provider>
}