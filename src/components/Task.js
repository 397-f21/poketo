import styled from "styled-components";
import { writeData, useUserState, deleteData } from "../utilities/firebase";
import { useState } from "react";
import {todayKey} from '../utilities/time';
import { pokemonList } from '../utilities/pokemon.js'; 

const TaskCard = styled.div`
    display: grid;
    width: 90%;
    max-width: 500px;
    height: 105px;
    min-height: 105px;
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

// const DeleteIcon = styled.div`
//     grid-area: delete;
//     width: flex;
//     margin-right: 27px;
//     height: 23px;
//     background: #F3F6FD;
//     border-radius: 20px;
// `



const Task = ({taskName, taskData}) => {

    const [completed, setCompleted] = useState(taskData.date.includes(todayKey));
    const [user] = useUserState();

    const deleteTask = () => {
        deleteData(`${user ? user.uid : "dummy"}/${taskName}`);
    }

    const markAsComplete = () => {
        if (!taskData.date.includes(todayKey)) {
            writeData(taskData.level + 1, `${user ? user.uid : "dummy"}/${taskName}/level`);
            taskData.date.push(todayKey)
            writeData(taskData.date, `${user ? user.uid : "dummy"}/${taskName}/date`);
            setCompleted(true);
        }
        else {
            writeData(taskData.level - 1, `${user ? user.uid : "dummy"}/${taskName}/level`);
            taskData.date.pop();
            writeData(taskData.date, `${user ? user.uid : "dummy"}/${taskName}/date`);
            setCompleted(false);
        }
        
    }

    const evoIndex = () => {
        return (taskData.level < 21) ? 0 : (taskData.level < 90) ? 1 : 2;
    }

    const pokemonNumber = () => {
        const pokemonObj = pokemonList.find(o => o.name === taskData.pokemon);
        if (!pokemonObj) {
            return "151";
        }
        return pokemonObj.numbers[evoIndex()];
    }

    const pokemonName = () => {
        const pokemonObj = pokemonList.find(o => o.name === taskData.pokemon);
        if (!pokemonObj) {
            return "";
        }
        return pokemonObj.evolutions[evoIndex()];
    }

    return(
        completed ? 
        <TaskCard style={{background: 'linear-gradient(180deg, #2AC4E6 0%, #728EE4 100%)'}}>
            <PokeImg onClick={markAsComplete}>
                <img src={`https://www.serebii.net/swordshield/pokemon/${pokemonNumber()}.png`}></img>
            </PokeImg>
            <PokeName data-cy="pokemon-name">{pokemonName()}</PokeName>
            <HabitName  data-cy="task-name">{taskName}</HabitName>
            <PokeLv>Lv. {taskData.level}</PokeLv>
            <button onClick={deleteTask}>delete </button>
            <ExpBar><ExpText>EXP</ExpText></ExpBar>
        </TaskCard> : 
        <TaskCard>
            <PokeImg onClick={markAsComplete}>
                <img src={`https://www.serebii.net/swordshield/pokemon/${pokemonNumber()}.png`}></img>
            </PokeImg>
            <PokeName data-cy="pokemon-name">{pokemonName()}</PokeName>
            <HabitName data-cy="task-name">{taskName}</HabitName>
            <PokeLv>Lv. {taskData.level}</PokeLv>
            <button onClick={deleteTask}>delete </button>
            <ExpBar><ExpText>EXP</ExpText></ExpBar>
        </TaskCard>
    )
}

export default Task;