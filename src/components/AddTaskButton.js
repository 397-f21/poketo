import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { writeData, useUserState } from '../utilities/firebase';
import { pokemonList } from '../utilities/pokemon.js';
import Task from './Task';
import styled from 'styled-components';
import '../styles/AddTaskButton.css'

const ModalStyles = {
    overlay:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}

const AddTaskCard = styled.div`
    display: grid;
    width: 90%;
    max-width: 500px;
    height: 105px;
    background: #FFFFFF;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
    border-radius: 40px 0px 0px 40px;
    margin-bottom: 10px;
    grid-template-columns: 30% 70%;
    grid-template-rows: 100%;
    grid-template-areas: 
        'add-btn add-desc';
    :hover{
        cursor: pointer;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.6);
        > h1{
            color: #494949;
        }
        path{
            fill: #494949;;
        }
    }
`

const AddBtn = styled.div`
    display: flex;
    grid-area: add-btn;
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: #F4F7FE;
    align-self: center;
    justify-self: center;
    align-items: center;
    justify-content: center;
`

const AddDesc = styled.h1`
    grid-area: add-desc;
    font-size: 16px;
    color: #DBDFE9;
    align-self: center;
`

const ModalTitle = styled.h1`
    margin: 50px 0 40px 0;
    font-size: 24px;
    color: #494949;
`

const ModalLabel = styled.h2`
    width: 90%;
    max-width: 500px;
    text-align: left;
    font-size: 16px;
    color: #848484;
`

const ModalTaskInput = styled.input`
    width: 90%;
    max-width: 500px;
    height: 45px;
    background: #FFFFFF;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    border: none;
    :focus{
        outline: none;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.6);
    }
    font-size: 16px;
    padding-left: 10px;
    margin-bottom: 20px;
`

const PokemonGrid = styled.div`
    display: grid;
    /* width: 90%; */
    grid-template-columns: repeat(3, 80px);
    grid-template-rows: repeat(auto-fill, 80px);
    column-gap: 23px;
    row-gap: 23px;
    margin-bottom: 30px;
    /* height: 500px; */
    >img{
        width: 90%;
        height: 90%;
        border-radius: 50%;
        background: #FFFFFF;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
        align-self: center;
        justify-self: center;
        :hover{
            /* border: 5px solid linear-gradient(180deg, #2AC4E6 0%, #728EE4 100%); */
            border: 4px solid #31C3FF;
            cursor: pointer;
        }
    }
`

const SubmitBtnWrapper = styled.div`
    width: 90%;
    max-width: 500px;
    display: flex;
    justify-content: flex-end;
`

const SubmitBtn = styled.button`
    width: 112px;
    height: 49px;
    left: 269px;
    top: 431px;
    background: #FFFFFF;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    border: none;
    :hover{
        cursor: pointer
    }
    >h1{
        font-style: bold;
        align-self: center;
        justify-self: center;
        margin: 0;
        color: #1389D2;
    }
`



const AddTaskButton = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [taskText, setTaskText] = useState("");
    const [selectedPokemon, setSelectedPokemon] = useState("");
    const [pokemonObj, setPokemonObj] = useState({});
    const [user] = useUserState();

    const handleChange = (event) => {
        setTaskText(event.target.value);
    };

    const selectPokemon = (pokemon, obj) => {
        pokemon === selectedPokemon ? setSelectedPokemon("") : setSelectedPokemon(pokemon);
        setPokemonObj(obj);
    }

    const generatePokemon = () => {
        return pokemonList.map((item, index) => {
            return(
                selectedPokemon === item.name?
                // refactor selectPokemon args
                <img key={index} alt='pokemonimg' onClick={() => selectPokemon(item.name, item)} src={`https://www.serebii.net/swordshield/pokemon/${item.number}.png`} style={{ border: '4px solid #31C3FF'}}/>:
                <img key={index} alt='pokemonimg' onClick={() => selectPokemon(item.name, item)} src={`https://www.serebii.net/swordshield/pokemon/${item.number}.png`} />
            )
        })
    }
    
    const getDatePath = () => {
        return 1;
    }

    const handleSubmit = (event) => {
        const today = new Date();
        const dbEntry = {
            'pokemon': selectedPokemon,
            'number': pokemonObj.number,
            'date': [``],//${today.getDay()}/${today.getMonth()}/${today.getDate()}/${today.getYear()}`],
            'level': 1
        }
        writeData(dbEntry, `${"dummy"}/${taskText}`);
        closeModal();
    };

    ReactModal.setAppElement('#root');

    const openModal = () => {
        setModalVisible(true);
    }

    const closeModal = () => {
        setModalVisible(false);
    }

    return(
        <>
            <AddTaskCard id='add-task-card' onClick={openModal} >
                <AddBtn id='add-btn'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.6667 13.6667H13.6667V23.6667H10.3333V13.6667H0.333328V10.3333H10.3333V0.333344H13.6667V10.3333H23.6667V13.6667Z" fill="#DBDFE9"/>
                    </svg>
                </AddBtn>
                <AddDesc>Add a Pokémon & Habit</AddDesc>
            </AddTaskCard>

            <ReactModal isOpen={modalVisible} onRequestClose={closeModal} className='modal-override' style={ModalStyles} shouldFocusAfterRender={false}>
                <ModalTitle>Add a New Habit</ModalTitle>
                <ModalLabel>Habit Name (task per day)</ModalLabel>
                <ModalTaskInput value={taskText} onChange={handleChange}/>
                <ModalLabel>Choose a Pokémon</ModalLabel>
                <PokemonGrid>
                    {generatePokemon()}
                </PokemonGrid>
                <SubmitBtnWrapper>
                    <SubmitBtn onClick={handleSubmit}>
                        <h1>Next</h1>
                    </SubmitBtn>
                </SubmitBtnWrapper>
            </ReactModal>
        </>
    )
}

export default AddTaskButton;
