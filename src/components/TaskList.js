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
const PartyPokemon = styled.h1`
    padding-top: 10px;
    font-family: Poppins;
    font-weight: 600;
    font-size: 16px;
    text-align: center;
    color: #C1C1C1;
`

const TaskList = ({tasks}) => {
    const [user] = useUserState();
    //const [tasks, loading, error] = useData(user ? user.uid : "dummy");

    const generateTaskList = () => {
        return Object.keys(tasks).map((task, index) => {
            return <Task key={task+index} taskName={task} taskData={tasks[task]}></Task>
        })
    }

    return (
        <>
            <PartyPokemon>YOUR POKÉMON</PartyPokemon>
            <TasksWrapper id='task-wrapper'>
                {!tasks ? null : generateTaskList()}
                <AddTaskButton/>
            </TasksWrapper>
        </>
    )
}

export default TaskList
