import { SignOutButton } from '../utilities/auth.js';
import TaskList from './TaskList';
import {
    ColorSplash1,
    ColorSplash2,
    ColorSplash3,
    ColorSplash4,
    ColorSplash5,
    ColorBlender
} from '../styles/ColorSplash';
import {todayKey, getDate} from '../utilities/time';
import{
    MainLayout,
    Header,
    HeaderDate,
    HabitCount,
    HabitsToGo,
    Content,
} from '../styles/PageNavigator.js'

const MainPage = ({tasks, setDetailedTaskView}) => {

    const getNumCompletedTasks = () => {
        return tasks ? Object.keys(tasks).filter((taskName) => tasks[taskName].date.includes(todayKey)).length : 0;
    }

    const getNumTasksTotal = () => {
        return tasks ? Object.keys(tasks).length : 0;
    }

    const getTasksFraction = () => {
        return `${getNumCompletedTasks()}/${getNumTasksTotal()}`;
    }

    return(
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
    );
}

export default MainPage;