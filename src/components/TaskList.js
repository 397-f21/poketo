import React from 'react'
import { useData, useUserState } from '../utilities/firebase.js';
import '../styles/TaskList.css'

const TaskList = () => {
    const [user] = useUserState();
    const [tasks, loading, error] = useData(user ? user.uid : "dummy");
    console.log(tasks);

    return (
        <div>
            <button className='task-box'>
                <h1>{tasks}</h1>
                
                </button>
        </div>
    )
}

export default TaskList
