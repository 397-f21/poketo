import { useData, useUserState } from '../utilities/firebase.js';
import TaskCard from './Task'
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

    return (
        <TasksWrapper id='task-wrapper'>
            <TaskCard task={tasks}/>
            <AddTaskButton/>
        </TasksWrapper>
    )
}

export default TaskList
