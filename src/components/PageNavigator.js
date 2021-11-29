import { useUserState, useData } from '../utilities/firebase.js';
import { useState } from "react";
import HomePage from './HomePage.js';
import MainPage from './MainPage.js';
import DetailedTaskView from './DetailedTaskView.js';

const PageNavigator = () => {
    const [user] = useUserState();
    const [tasks, loading, error] = useData(user ? user.uid : "dummy");
    const [detailedPokeTask, setDetailedPokeTask] = useState({});

    console.log(detailedPokeTask);
    console.log(loading);
    console.log(error);

    return (
        !user ?
            <HomePage></HomePage> :
        !Object.keys(detailedPokeTask).length ?
            <MainPage tasks = {tasks} setDetailedTaskView = {setDetailedPokeTask}></MainPage>
        : 
            <DetailedTaskView detailedPokeTask = {detailedPokeTask} setDetailedPokeTask = {setDetailedPokeTask}></DetailedTaskView>
    );
}

export default PageNavigator;