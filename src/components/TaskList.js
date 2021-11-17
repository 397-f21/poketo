import { useData, useUserState } from '../utilities/firebase.js';
import Task from './Task'
import AddTaskButton from './AddTaskButton.js';
import styled from 'styled-components';
import '../styles/TaskList.css'

const TasksWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
`

const TaskList = () => {
    const [user] = useUserState();
    const [tasks, loading, error] = useData(user ? user.uid : "dummy");
    console.log(tasks);

    const generateTaskList = () => {

        return Object.keys(tasks).map((task) => {
            return <Task task={task} taskData={tasks[task]}></Task>
        })
    }

    return (
        <TasksWrapper id='task-wrapper'>
            {loading||error? null : generateTaskList()}
            <AddTaskButton/>
        </TasksWrapper>
    )
}

export default TaskList
