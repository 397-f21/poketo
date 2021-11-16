import './App.css';
import styled from 'styled-components';
import AddTaskButton from './components/AddTaskButton';
import TaskList from './components/TaskList';
import {ColorSplash1, 
        ColorSplash2, 
        ColorSplash3, 
        ColorSplash4, 
        ColorSplash5, 
        ColorBlender} from './styles/ColorSplash';

const MainLayout = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    position: fixed; //To ensure that "ColorSplashes" do not make the screen scroll
    flex-direction: column;
    background: #84A7EA;
`

const Header = styled.div`
    display: flex;
    width: 100%;
    height: 35%;
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

function App() {
    return (
        <MainLayout>

            <ColorSplash5 id='splash5'/>
            <ColorSplash4 id='splash4'/>
            <ColorSplash3 id='splash3'/>
            <ColorSplash2 id='splash2'/>
            <ColorSplash1 id='splash1'/>
            <ColorBlender id='color-blender'/>

            <Header id='header'/>

            <Content id='content'>
                <TaskList />
                {/* <AddTaskButton /> */}
            </Content>

        </MainLayout>
    );
}

export default App;
