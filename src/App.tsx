import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from './Todolist'

export type FilterButtonType = 'All' | 'Active' | 'Completed'


function App() {

    const title1 = 'What to learn1111'

    const [tasks1, setTasks1] = useState<Array<TasksType>>([
        {id: 1, title: "HTML&CSS", isDone: true, newValue: true},
        {id: 2, title: "JS", isDone: true, newValue: true},
        {id: 3, title: "ReactJS", isDone: false, newValue: true},
        {id: 4, title: "ReactJS", isDone: false, newValue: true}
    ])

    const removeTask = (taskID: number) => {
        setTasks1(tasks1.filter(el => el.id !== taskID))
    }

    let [filteredTask, setFilteredTask] = useState<TasksType[]>(tasks1)

    const changeFilter = (filterValue: FilterButtonType) => {
        let tasks1Filter = tasks1
        if (filterValue === 'Active') {
            tasks1Filter = tasks1.filter(el => !el.isDone)
        } if (filterValue === 'Completed') {
            tasks1Filter = tasks1.filter(el => el.isDone)
        }
    }

    return (
        <div className="App">
            <Todolist title={title1}
                      tasks={tasks1}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />


        </div>
    );
}

export default App;

