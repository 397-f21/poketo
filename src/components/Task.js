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
    display: flex;
    align-items: center;
    justify-content: center;
    grid-area: poke-img;
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: #F4F7FE;
    align-self: center;
    justify-self: center;
    >img{
        border-radius: 50%;
        width: 60px;
        height: 60px;
    }
`

const Task = ({task, taskData}) => {

    const today = new Date();
    const todayString = `${today.getDay()}/${today.getMonth()}/${today.getDate()}/${today.getYear()}`;
    const [completed, setCompleted] = useState(taskData.date.includes(todayString));

    const markAsComplete = () => {
        if (!taskData.date.includes(todayString)) {
            writeData(taskData.level + 1, `${"dummy"}/${task}/level`);
            taskData.date.push(todayString)
            writeData(taskData.date, `${"dummy"}/${task}/date`);
            setCompleted(true);
        }
        else {
            writeData(taskData.level - 1, `${"dummy"}/${task}/level`);
            taskData.date.pop();
            writeData(taskData.date, `${"dummy"}/${task}/date`);
            setCompleted(false);
        }
        
    }

    return(
        completed ? 
        <TaskCard style={{background: 'linear-gradient(180deg, #2AC4E6 0%, #728EE4 100%)'}}>
            <PokeImg onClick={markAsComplete}>
                <img src={`https://www.serebii.net/swordshield/pokemon/${taskData.number}.png`}></img>
            </PokeImg>
            <p>{taskData.pokemon}</p>
            <p>{task}</p>
            <p>Lv. {taskData.level}</p>
        </TaskCard> : 
        <TaskCard>
            <PokeImg onClick={markAsComplete}>
                <img src={`https://www.serebii.net/swordshield/pokemon/${taskData.number}.png`}></img>
            </PokeImg>
            <p>{taskData.pokemon}</p>
            <p>{task}</p>
            <p>Lv. {taskData.level}</p>
        </TaskCard>
    )
}

export default Task;