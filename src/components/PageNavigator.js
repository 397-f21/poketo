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
import {today, todayKey, getDate} from '../utilities/time';

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
        align-items: center;
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
    
const DetailedTaskLayout = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    position: fixed; //To ensure that "ColorSplashes" do not make the screen scroll
    flex-direction: column;
    background: #84A7EA;
    z-index: 0;
`

const DetailedPokeHeader = styled.div`
    display: flex;
    z-index: 1;
    width: 90%;
    height: 10%;
    min-height: 60px;
    align-items: center;
    justify-content: space-between;
    /* padding-left: 30px; */
`

const DetailedPokeContent = styled.div`
    display: flex;
    width: 100%;
    height: 90%;
    align-items: center;
    /* justify-content: space-between; */
    flex-direction: column;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.9) 27.6%);
    z-index: 1;
    overflow-y: scroll;
    >img{
        width: 200px;
        height: 200px;
    }
    >h1{
        font-family: Poppins;
        font-style: normal;
        font-weight: 600;
        font-size: 30px;
        color: #494949;
        margin: 0;
    }
`

const DetailedCompleteToggle = styled.div`
    display: flex;
    align-items: center;
    width: 164px;
    height: 46px;
    background: #F4F5FC;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
    border-radius: 50px;
    >h1{
        font-family: Poppins;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        color: #1389D2;
        width: 118px;
        text-align: center;
    }
`

const DetailedCompleteToggleBtn = styled.button`
    display: flex;
    align-items: center;
    width: 46px;
    height: 46px;
    background: #FFFFFF;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
    border-radius: 50%;
    border: none;
`

const DetailedPokeInfo = styled.div`
    text-align: center;
    >h2{
        font-family: Poppins;
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        color: #848484;
        margin: 0;
    }
    >h3{
        font-family: Poppins;
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        color: #848484;
        margin: 0
    }
`

const DetailedLevelContainer = styled.div`
    width: 330px;
    min-height: 64px;
    background: #FFFFFF;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
    border-radius: 20px;
    margin-bottom: 10px;

`

const DetailedStatsContainer = styled.div`
    width: 330px;
    min-height: 138px;
    background: #FFFFFF;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
    border-radius: 20px;
    margin-bottom: 10px;
`

const DetailedCalendarContainer = styled.div`
    width: 330px;
    min-height: 191px;
    background: #FFFFFF;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
    border-radius: 20px;
    margin-bottom: 10px;
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

    console.log(detailedTaskView)

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
                    <HeaderDate>{getDate()}</HeaderDate>
                    <HabitCount data-cy='habit-count'>{getTasksFraction()}</HabitCount>
                    <HabitsToGo>Habits Completed</HabitsToGo>
                </Header>
                <Content id='content'>
                    <TaskList setDetailedTaskView={setDetailedTaskView} tasks={tasks}/>
                    <SignOutButton />
                    {/* <AddTaskButton /> */}
                </Content>
            </MainLayout>

            :

            <DetailedTaskLayout>
                <ColorSplash5 id='splash5' />
                <ColorSplash4 id='splash4' />
                <ColorSplash3 id='splash3' />
                <ColorSplash2 id='splash2' />
                <ColorSplash1 id='splash1' />
                <ColorBlender id='color-blender' />

                <DetailedPokeHeader>
                    <svg onClick={() => setDetailedTaskView({})} width="15" height="26" viewBox="0 0 15 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.8875 2.8375L12.6625 0.625L0.299988 13L12.675 25.375L14.8875 23.1625L4.72499 13L14.8875 2.8375Z" fill="white"/>
                    </svg>
                    <DetailedCompleteToggle>
                        <h1>Complete?</h1>
                        <DetailedCompleteToggleBtn>
                            <svg width="30" height="23" viewBox="0 0 30 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 17.95L3.05002 11L0.68335 13.35L10 22.6666L30 2.66665L27.65 0.31665L10 17.95Z" fill="#E1E9F0"/>
                            </svg>
                        </DetailedCompleteToggleBtn>
                    </DetailedCompleteToggle>
                </DetailedPokeHeader>
                <DetailedPokeContent>
                    <img src={`https://www.serebii.net/swordshield/pokemon/${detailedTaskView.pokemonNumber}.png`}></img>
                    <DetailedPokeInfo>
                        <h2>{detailedTaskView.pokemon}</h2>
                        <h3>Level {detailedTaskView.level}</h3>
                    </DetailedPokeInfo>
                    <h1>{detailedTaskView.taskName}</h1>
                    <DetailedLevelContainer>


                    </DetailedLevelContainer>
                    <DetailedStatsContainer>


                    </DetailedStatsContainer>
                    <DetailedCalendarContainer>


                    </DetailedCalendarContainer>
                </DetailedPokeContent>
            </DetailedTaskLayout>
    );
}

export default PageNavigator;