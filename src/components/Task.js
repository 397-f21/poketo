import styled from "styled-components";
import { writeData } from "../utilities/firebase";
import { useState } from "react";
import {todayKey} from '../utilities/time';

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
        'poke-img exp';
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

const Task = ({task: taskName, taskData}) => {

    const [completed, setCompleted] = useState(taskData.date.includes(todayKey));

    const markAsComplete = () => {
        if (!taskData.date.includes(todayKey)) {
            writeData(taskData.level + 1, `${"dummy"}/${taskName}/level`);
            taskData.date.push(todayKey)
            writeData(taskData.date, `${"dummy"}/${taskName}/date`);
            setCompleted(true);
        }
        else {
            writeData(taskData.level - 1, `${"dummy"}/${taskName}/level`);
            taskData.date.pop();
            writeData(taskData.date, `${"dummy"}/${taskName}/date`);
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
            <p>{taskName}</p>
            <p>Lv. {taskData.level}</p>
        </TaskCard> : 
        <TaskCard>
            <PokeImg onClick={markAsComplete}>
                <img src={`https://www.serebii.net/swordshield/pokemon/${taskData.number}.png`}></img>
            </PokeImg>
            <p>{taskData.pokemon}</p>
            <p>{taskName}</p>
            <p>Lv. {taskData.level}</p>
        </TaskCard>
    )
}

export default Task;