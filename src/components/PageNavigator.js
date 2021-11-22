import styled from 'styled-components';
import { useUserState, useData } from '../utilities/firebase.js';
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
import {todayKey} from '../utilities/time';

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
    `

const HeaderDate = styled.p`
        font-family: Poppins;
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        line-height: 30px;
        text-align: center;
        color: #FFFFFF;
        z-index: 1;
    `

const HabitCount = styled.p`
        font-family: 'Source Sans Pro', sans-serif;
        font-weight: 900;
        font-size: 40px;
        line-height: 30px;
        text-align: center;
        color: #FFFFFF;
        margin: 0px;
        z-index: 1;
    `
const HabitsToGo = styled.p`
        font-family: Poppins;
        font-weight: 700;
        font-size: 10px;
        line-height: 30px;
        text-align: center;
        color: #FFFFFF;
        text-transform: uppercase;
        margin: 0px;
        z-index: 1;
    `

const Content = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        flex-grow: 1;
        background: rgba(255, 255, 255, 0.9);
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
        border-radius: 50px 50px 0px 0px;
        z-index: 2;
    `

const PageNavigator = () => {
    const [user] = useUserState();
    const [tasks, loading, error] = useData(user ? user.uid : "dummy");

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
            <MainLayout>
                <SignInButton />
            </MainLayout> :
            <MainLayout>
                <ColorSplash5 id='splash5' />
                <ColorSplash4 id='splash4' />
                <ColorSplash3 id='splash3' />
                <ColorSplash2 id='splash2' />
                <ColorSplash1 id='splash1' />
                <ColorBlender id='color-blender' />

                <Header id='header' />
                <HeaderDate>Today's Date</HeaderDate>
                <HabitCount>{getTasksFraction()}</HabitCount>
                <HabitsToGo>Habits Completed</HabitsToGo>
                <Content id='content'>
                    <TaskList tasks={tasks}/>
                    <SignOutButton />
                    {/* <AddTaskButton /> */}
                </Content>
            </MainLayout>
    );
}

export default PageNavigator;