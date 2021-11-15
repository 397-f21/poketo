import React, { useState } from 'react';
import ReactModal from 'react-modal';
import '../styles/AddTaskButton.css'
import { writeData, useUserState } from '../utilities/firebase';
import { pokemonList } from '../utilities/pokemon.js';

const customStyles = {
    overlay:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}

const AddTaskButton = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [taskText, setTaskText] = useState("");
    const [user] = useUserState();

    const handleChange = (event) => {
        setTaskText(event.target.value);
    };
    
    const getDatePath = () => {
        return 1;
    }

    const handleSubmit = (event) => {
        console.log(taskText);
        writeData(taskText, `${"dummy"}/${getDatePath()}`);
    };

    ReactModal.setAppElement('#root');

    const openModal = () => {
        setModalVisible(true);
    }

    const closeModal = () => {
        setModalVisible(false);
    }

    const PokemonGrid = () => {
        return(
            <div>
                <h1>Choose a Pokemon.</h1>
                {pokemonList.map((item, index) => {
                return(
                    <img key={index} src={`https://www.serebii.net/swordshield/pokemon/${item.number}.png`} />
                
                )
            })}
                <h2>pokemonList.</h2>
            </div>
        )
    }

    return(
        <div >
            <button className='add-task-button' onClick={openModal}>
                <h1>Add Task</h1>
                </button>
            <ReactModal isOpen={modalVisible} onRequestClose={closeModal} className="modal-styling" style={customStyles}>
                <div onClick={closeModal}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.8333 5.34167L14.6583 4.16667L9.99996 8.82501L5.34163 4.16667L4.16663 5.34167L8.82496 10L4.16663 14.6583L5.34163 15.8333L9.99996 11.175L14.6583 15.8333L15.8333 14.6583L11.175 10L15.8333 5.34167Z" fill="#DCDCDC"/>
                    </svg>
                </div>
                <div>Add a task!</div>
                <input type="text" value={taskText} onChange={handleChange}/>
                <PokemonGrid />
                
                <input type="text" value={taskText} onChange={handleChange}/>
                <br /><button type="submit" onClick={handleSubmit}> Ok </button>
            </ReactModal>
        </div>
    )
}

export default AddTaskButton;