import Task from './Task'
import AddTaskButton from './AddTaskButton.js';
import styled from 'styled-components';
import '../styles/TaskList.css'

const TasksWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 85%;
    align-items: center;
    justify-content: flex-start;
    overflow: scroll;
`
const PartyPokemon = styled.h1`
    padding-top: 10px;
    font-family: Poppins;
    font-weight: 600;
    font-size: 16px;
    text-align: center;
    color: #C1C1C1;
`

const TaskList = ({tasks, setDetailedTaskView}) => {

    const generateTaskList = () => {
        return Object.keys(tasks).map((task, index) => {
            return <Task key={task+index} taskName={task} taskData={tasks[task]} setDetailedTaskView={setDetailedTaskView} data-cy='task-card'></Task>
        })
    }

    return (
        <>
            <TasksWrapper id='task-wrapper'>
                <PartyPokemon>YOUR POKÉMON</PartyPokemon>
                <AddTaskButton/>
                {!tasks ? null : generateTaskList()}
            </TasksWrapper>
        </>
    )
}

export default TaskList
