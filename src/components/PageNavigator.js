import styled from 'styled-components';
import { useUserState, useData } from '../utilities/firebase.js';
import { useState } from "react";
import { SignInButton, SignOutButton } from '../utilities/auth.js';
import TaskList from './TaskList';
import {
    ColorSplash1,
    ColorSplash2,
    ColorSplash3,
    ColorSplash4,
    ColorSplash5,
    ColorBlender
} from '../styles/ColorSplash';
import {today, todayKey} from '../utilities/time';

const TitleLayout = styled.div`
        height: 100vh;
        width: 100vw;
        display: flex;
        position: fixed; //To ensure that "ColorSplashes" do not make the screen scroll
        flex-direction: column;
        background: #001451;
        z-index: 0;
        align-items: center;
        justify-content: space-around;
    `

const AppTitle = styled.p`
        /* Pokéto */
        width: 213px;
        height: 90px;
        left: 108px;
        top: 283px;
        font-family: Poppins;
        font-style: normal;
        font-weight: bold;
        font-size: 60px;
        line-height: 90px;
        /* identical to box height */
        text-align: center;
        color: #FFFFFF;
        text-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
        margin: 0px;
        z-index: 1;
    `

const MainLayout = styled.div`
        height: 100vh;
        width: 100vw;
        display: flex;
        position: fixed; //To ensure that "ColorSplashes" do not make the screen scroll
        flex-direction: column;
        background: #84A7EA;
        z-index: 0;
    `

const Header = styled.div`
        display: flex;
        width: 100%;
        height: 35%;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    `

const HeaderDate = styled.p`
        font-family: Poppins;
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        line-height: 30px;
        /* text-align: center; */
        color: #FFFFFF;
        z-index: 1;
    `

const HabitCount = styled.p`
        font-family: 'Source Sans Pro', sans-serif;
        font-weight: 900;
        font-size: 40px;
        line-height: 30px;
        /* text-align: center; */
        color: #FFFFFF;
        margin: 0px;
        z-index: 1;
    `
const HabitsToGo = styled.p`
        font-family: Poppins;
        font-weight: 700;
        font-size: 10px;
        line-height: 30px;
        /* text-align: center; */
        color: #FFFFFF;
        text-transform: uppercase;
        margin: 0px;
        z-index: 1;
    `

const Content = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 65%;
        /* flex-grow: 1; */
        background: rgba(255, 255, 255, 0.9);
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
        border-radius: 50px 50px 0px 0px;
        z-index: 2;
        /* overflow: scroll; */
    `

const DetailedPokeName = styled.p`
    grid-area: nm;
    padding-top: 20px;
    margin: 0px;
    font-weight: 500;
    font-size: 14px;
    color: #494949;
`
const DetailedHabitName = styled.p`
    grid-area: habit; 
    margin: 0px; 
    font-weight: bold;
    font-size: 14px;
    color: #494949;
`
const DetailedPokeLv = styled.p`
    grid-area: lv;
    margin: 0px;
    padding-top: 20px;
    font-weight: 600;
    font-size: 14px;
    text-transform: uppercase;
    color: #494949;
`

const DetailedPokeImg = styled.div`
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

const PageNavigator = () => {
    const [user] = useUserState();
    const [tasks, loading, error] = useData(user ? user.uid : "dummy");
    const [detailedTaskView, setDetailedTaskView] = useState({});

    const getNumCompletedTasks = () => {
        return tasks ? Object.keys(tasks).filter((taskName) => tasks[taskName].date.includes(todayKey)).length : 0;
    }

    const getNumTasksTotal = () => {
        return tasks ? Object.keys(tasks).length : 0;
    }

    const getTasksFraction = () => {
        return `${getNumCompletedTasks()}/${getNumTasksTotal()}`;
    }

    return (
        !user ?
            <TitleLayout>
                <AppTitle>Pokéto</AppTitle >

                <ColorSplash5 id='splash5' />
                <ColorSplash4 id='splash4' />
                <ColorSplash3 id='splash3' />
                <ColorSplash2 id='splash2' />
                <ColorSplash1 id='splash1' />
                <ColorBlender id='color-blender' />

                <SignInButton />
                
            </TitleLayout> :

        !Object.keys(detailedTaskView).length ?

            <MainLayout>
                <ColorSplash5 id='splash5' />
                <ColorSplash4 id='splash4' />
                <ColorSplash3 id='splash3' />
                <ColorSplash2 id='splash2' />
                <ColorSplash1 id='splash1' />
                <ColorBlender id='color-blender' />
                

                <Header id='header'>
                    <HeaderDate>{today.toString()}</HeaderDate>
                    <HabitCount data-cy='habit-count'>{getTasksFraction()}</HabitCount>
                    <HabitsToGo>Habits Completed</HabitsToGo>
                </Header>
                <Content id='content'>
                    <TaskList tasks={tasks}/>
                    <SignOutButton />
                    {/* <AddTaskButton /> */}
                </Content>
            </MainLayout>

            :

            <MainLayout>


            </MainLayout>
    );
}

export default PageNavigator;