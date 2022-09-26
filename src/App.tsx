import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from './Todolist'
import {v1} from "uuid";

export type FilterButtonType = 'All' | 'Active' | 'Completed'


function App() {

    const title1 = 'What to learn1111'

    const [tasks1, setTasks1] = useState<Array<TasksType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "RestAPI", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false}
    ])

    const addTask = (title: string) => {
        const newTask: TasksType = {id: v1(), title: title, isDone: false};
        setTasks1([newTask, ...tasks1])

    }

    const removeTask = (taskID: string) => {
        let filteredTask = tasks1.filter(el => el.id !== taskID);
        setTasks1(filteredTask);
    }

    let [filter, setFilter] = useState<FilterButtonType>('All')
    let tasks1Filter = tasks1
    if (filter === 'Active') {
        tasks1Filter = tasks1.filter(el => !el.isDone)
    }
    if (filter === 'Completed') {
        tasks1Filter = tasks1.filter(el => el.isDone)
    }

    const changeFilter = (filterValue: FilterButtonType) => {
        setFilter(filterValue)
    }

    return (
        <div className="App">
            <Todolist title={title1}
                      tasks={tasks1Filter}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />


        </div>
    );
}

export default App;

