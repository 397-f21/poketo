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
    grid-template-columns: 28% 54% 12% 6%;
    grid-template-rows: 37% 19% 44%;
    grid-template-areas: 
        'poke-img nm lv delete'
        'poke-img habit habit delete'
        'poke-img exper exper delete';
    &:hover{
        /* cursor: pointer; */
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
    :hover{
        cursor: pointer;
    }
`

const SelectedPokeName = styled.p`
    grid-area: nm;
    padding-top: 20px;
    margin: 0px;
    font-weight: 500;
    font-size: 14px;
    color: #FFFFFF;
`
const SelectedHabitName = styled.p`
    grid-area: habit; 
    margin: 0px; 
    font-weight: bold;
    font-size: 14px;
    color: #FFFFFF;
`
const SelectedPokeLv = styled.p`
    grid-area: lv;
    margin: 0px;
    padding-top: 20px;
    font-weight: 600;
    font-size: 14px;
    text-transform: uppercase;
    color: #FFFFFF;
`

const SelectedPokeImg = styled.div`
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
    position: relative;
    >img{
        position: absolute;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        opacity: 0.2;
    }
    >svg{
        z-index: 1;
    }
    :hover{
        cursor: pointer;
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

const DeleteIcon = styled.p`
    /* position: relative;
    right: 5px;
    top: 5px; */
    grid-area: delete;
    font-weight: bold;
    :hover{
        cursor: pointer;
    }
`

const Task = ({taskName, taskData, setDetailedTaskView}) => {

    const [completed, setCompleted] = useState(taskData.date.includes(todayKey));
    const [user] = useUserState();

    const seeDetailedView = () => {
        setDetailedTaskView(
            {
                taskName: taskName,
                date: taskData.date,
                level: taskData.level,
                pokemon: taskData.pokemon,
                pokemonNumber: pokemonNumber()
            }
        );
    }

    const deleteTask = (e) => {
        e.stopPropagation();
        deleteData(`${user ? user.uid : "dummy"}/${taskName}`);
    }

    const markAsComplete = (e) => {
        e.stopPropagation();
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
            <SelectedPokeImg data-cy={taskName} onClick={markAsComplete}>
                <svg width="30" height="23" viewBox="0 0 30 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 17.95L3.05 11L0.683334 13.35L10 22.6667L30 2.66667L27.65 0.316666L10 17.95Z" fill="#1389D2"/>
                </svg>  
                <img src={`https://www.serebii.net/swordshield/pokemon/${pokemonNumber()}.png`}></img>
            </SelectedPokeImg>
            <SelectedPokeName data-cy="pokemon-name">{pokemonName()}</SelectedPokeName>
            <SelectedHabitName  data-cy="task-name">{taskName}</SelectedHabitName>
            <SelectedPokeLv data-cy='pokemon-level'>Lv. {taskData.level}</SelectedPokeLv>
            {/* <button onClick={deleteTask}>delete </button> */}
            <ExpBar><ExpText>EXP</ExpText></ExpBar>
            <DeleteIcon data-cy={`${pokemonName()}-${taskName.replace(' ', '-')}-del-button`} onClick={deleteTask}> X </DeleteIcon>
        </TaskCard> : 
        <TaskCard onClick={seeDetailedView}>
            <PokeImg data-cy={taskName} onClick={markAsComplete}>
                <img src={`https://www.serebii.net/swordshield/pokemon/${pokemonNumber()}.png`}></img>
            </PokeImg>
            <PokeName data-cy="pokemon-name">{pokemonName()}</PokeName>
            <HabitName data-cy="task-name">{taskName}</HabitName>
            <PokeLv data-cy='pokemon-level'>Lv. {taskData.level}</PokeLv>
            <ExpBar><ExpText>EXP</ExpText></ExpBar>
            <DeleteIcon data-cy={`${pokemonName()}-${taskName.replace(' ', '-')}-del-button`} onClick={deleteTask}> X </DeleteIcon>
        </TaskCard>
    )
}

export default Task;