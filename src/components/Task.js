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
    grid-template-columns: 28% 54% 18%;
    grid-template-rows: 37% 19% 44%;
    grid-template-areas: 
        'poke-img nm lv'
        'poke-img habit habit'
        'poke-img exper exper';
    &:hover{
        cursor: pointer;
        box-shadow: 0px 0px 20px rgba(19, 137, 210, 0.8);
    }
`


const PokeName = styled.p`
    grid-area: nm;
    padding-top: 20px;
    margin: 0px;
    font-weight: 500;
    font-size: 14px;
    color: #494949;
`
const HabitName = styled.p`
    grid-area: habit; 
    margin: 0px; 
    font-weight: bold;
    font-size: 14px;
    color: #494949;
`
const PokeLv = styled.p`
    grid-area: lv;
    margin: 0px;
    padding-top: 20px;
    font-weight: 600;
    font-size: 14px;
    text-transform: uppercase;
    color: #494949;
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

const ExpBar = styled.div`
    grid-area: exper;
    width: flex;
    margin-right: 27px;
    height: 23px;
    background: #F3F6FD;
    border-radius: 20px;
`
const ExpText = styled.p`
    font-family: Poppins;
    font-weight: 600;
    font-size: 12px;
    color: #494949;
    padding: 3px 8px;
    margin: 0px;
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
            <PokeName>{taskData.pokemon}</PokeName>
            <HabitName>{task}</HabitName>
            <PokeLv>Lv. {taskData.level}</PokeLv>
            <ExpBar><ExpText>EXP</ExpText></ExpBar>
        </TaskCard> : 
        <TaskCard>
            <PokeImg onClick={markAsComplete}>
                <img src={`https://www.serebii.net/swordshield/pokemon/${taskData.number}.png`}></img>
            </PokeImg>
            <PokeName>{taskData.pokemon}</PokeName>
            <HabitName>{task}</HabitName>
            <PokeLv>Lv. {taskData.level}</PokeLv>
            <ExpBar><ExpText>EXP</ExpText></ExpBar>
        </TaskCard>
    )
}

export default Task;