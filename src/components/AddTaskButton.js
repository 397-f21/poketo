import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { writeData, useUserState } from '../utilities/firebase';
import { pokemonList } from '../utilities/pokemon.js';
import styled from 'styled-components';
import '../styles/AddTaskButton.css'

const ModalStyles = {
    overlay: {
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
    min-height: 105px;
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
    margin: 50px 0 50px 0;
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
    width: 90%;
    height: 40%;
    overflow-y: scroll;
    justify-content: center;
    align-content: flex-start;
    grid-template-columns: repeat(3, 90px);
    grid-auto-rows: 90px;
    column-gap: 23px;
    row-gap: 23px;
    /* grid-template-rows: repeat(auto-fit, 90px); */
    /* padding-bottom: 30px; */
    /* height: 500px; */
    >img{
        /* width: 90%;
        height: 90%; */
        min-width: 72px;
        min-height: 72px;
        max-width: 72px;
        max-height: 72px;
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
    margin-top: 10px;
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
        cursor: pointer;
    }
    :disabled{
        cursor: not-allowed;
        background: #EEEEEE;
    }
    :disabled >h1 {
        color: #AAAAAA;
    }
    >h1{
        font-style: bold;
        align-self: center;
        justify-self: center;
        margin: 0;
        color: #1389D2;
    }
`

const HeaderWrapper = styled.div`
    width: 90%;
    max-width: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 112px;
`

const BackBtn = styled.button`
    width: 112px;
    height: 49px;
    left: 269px;
    top: 431px;
    background: transparent;
    border: none;
    :hover{
        cursor: pointer;
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
    const [selectedPokeObj, setSelectedPokeObj] = useState({}); // UNUSED
    const [user] = useUserState();
    const [submitDisabled, setSubmitDisabled] = useState(false);

    const handleChange = (event) => {
        setTaskText(event.target.value);
        setSubmitDisabled((Object.keys(selectedPokeObj).length === 0) || event.target.value === "");
    };

    const selectPokemon = (pokeObj) => {
        const currPokeObj = pokeObj.name === selectedPokeObj.name ? {} : pokeObj;
        setSelectedPokeObj(currPokeObj);
        setSubmitDisabled((Object.keys(currPokeObj).length === 0) || taskText === "");
    }

    const generatePokemon = () => {
        return pokemonList.map((pokemon, index) => {
            return (
                selectedPokeObj.name === pokemon.name ?
                    <img data-cy={`${pokemon.name}-input`} key={index} alt='pokemonimg' onClick={() => selectPokemon(pokemon)} src={`https://www.serebii.net/swordshield/pokemon/${pokemon.numbers[0]}.png`} style={{ border: '4px solid #31C3FF' }} /> :
                    <img data-cy={`${pokemon.name}-input`} key={index} alt='pokemonimg' onClick={() => selectPokemon(pokemon)} src={`https://www.serebii.net/swordshield/pokemon/${pokemon.numbers[0]}.png`} />
            )
        })
    }

    const handleSubmit = (event) => {
        const dbEntry = {
            'pokemon': selectedPokeObj.name,
            'date': [''],
            'level': 0
        }
        writeData(dbEntry, `${user ? user.uid : "dummy"}/${taskText}`);
        closeModal();
    };

    ReactModal.setAppElement('#root');

    const openModal = () => {
        setSubmitDisabled((Object.keys(selectedPokeObj).length === 0) || taskText === "");
        setModalVisible(true);
    }

    const closeModal = () => {
        setModalVisible(false);
    }

    return (
        <>
            <AddTaskCard id='add-task-card' onClick={openModal} >
                <AddBtn id='add-btn' data-cy="add-task">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.6667 13.6667H13.6667V23.6667H10.3333V13.6667H0.333328V10.3333H10.3333V0.333344H13.6667V10.3333H23.6667V13.6667Z" fill="#DBDFE9" />
                    </svg>
                </AddBtn>
                <AddDesc>Add a Pokémon & Habit</AddDesc>
            </AddTaskCard>

            <ReactModal isOpen={modalVisible} onRequestClose={closeModal} className='modal-override' style={ModalStyles} shouldFocusAfterRender={false}>
                <HeaderWrapper>
                    <BackBtn data-cy="back-btn" onClick={closeModal}>
                        <h1> &#60; </h1>
                    </BackBtn>
                    <ModalTitle>Add a New Habit</ModalTitle>
                </HeaderWrapper>
                <ModalLabel>Habit Name (task per day)</ModalLabel>
                <ModalTaskInput value={taskText} data-cy="task-input" onChange={handleChange} />
                <ModalLabel>Choose a Pokémon</ModalLabel>
                <PokemonGrid id='pokemon-grid'>
                    {generatePokemon()}
                </PokemonGrid>
                <SubmitBtnWrapper>
                    <SubmitBtn data-cy="submit-btn" onClick={handleSubmit} disabled={submitDisabled}>
                        <h1>Next</h1>
                    </SubmitBtn>
                </SubmitBtnWrapper>
            </ReactModal>
        </>
    )
}

export default AddTaskButton;
