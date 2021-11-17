import styled from "styled-components";
import { writeData } from "../utilities/firebase";
import { useState } from "react";

const TaskCard = styled.div`
    display: grid;
    width: 90%;
    max-width: 500px;
    height: 105px;
    background: #FFFFFF;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
    border-radius: 40px 0px 0px 40px;
    margin-bottom: 10px;
    grid-template-columns: 30% 70%;
    grid-template-rows: repeat(3, calc(100%/3));
    grid-template-areas: 
        'poke-img nm-lv'
        'poke-img habit'
        'poke-img exper';
    &:hover{
        cursor: pointer;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.6);
    }
`

const PokeImg = styled.div`
    grid-area: poke-img;
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: #F4F7FE;
    align-self: center;
    justify-self: center;
`

const Task = ({task, taskData}) => {
    const [completed, setCompleted] = useState(false);

    const markAsComplete = () => {
        const today = new Date();
        const todayString = `${today.getDay()}/${today.getMonth()}/${today.getDate()}/${today.getYear()}`;
        if (!taskData.date.includes(todayString)) {
            writeData(taskData.level + 1, `${"dummy"}/${task}/level`);
            taskData.date.push(todayString)
            writeData(taskData.date, `${"dummy"}/${task}/date`);
            setCompleted(true);
            console.log(completed);
        }
        else {
            writeData(taskData.level - 1, `${"dummy"}/${task}/level`);
            taskData.date.pop();
            writeData(taskData.date, `${"dummy"}/${task}/date`);
            setCompleted(false);
            console.log(completed);
        }
        
    }

    return(
        completed ? 
        <TaskCard style={{background: 'linear-gradient(180deg, #2AC4E6 0%, #728EE4 100%)'}}>
            <PokeImg onClick={markAsComplete} />
            <p>{taskData.pokemon}</p>
            <p>{task}</p>
            <p>Lv. {taskData.level}</p>
            {/* <h1>{task}</h1> */}
        </TaskCard> : 
        <TaskCard>
            <PokeImg onClick={markAsComplete} />
            <p>{taskData.pokemon}</p>
            <p>{task}</p>
            <p>Lv. {taskData.level}</p>
            {/* <h1>{task}</h1> */}
        </TaskCard>
    )
}

export default Task;