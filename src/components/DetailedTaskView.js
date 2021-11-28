import { useEffect } from 'react';
import{
    ColorSplash1,
    ColorSplash2,
    ColorSplash3,
    ColorSplash4,
    ColorSplash5,
    ColorBlender
} from '../styles/ColorSplash';
import{
    DetailedTaskLayout,
    DetailedPokeHeader,
    DetailedCompleteToggle,
    DetailedCompleteToggleBtn,
    DetailedPokeContent,
    DetailedPokeInfo,
    DetailedLevelContainer,
    DetailedProgressBar,
    DetailedProgressBarFill,
    DetailedStatsContainer,
    DetailedCalendarContainer
} from '../styles/PageNavigator.js';
import{
    todayKey
} from '../utilities/time.js';
import{
    writeData,
    useUserState
} from '../utilities/firebase.js';

const DetailedTaskView = ({detailedPokeTask, setDetailedPokeTask}) => {
    const [user] = useUserState();
    useEffect(() => {
        writeData(detailedPokeTask.level, `${user ? user.uid : "dummy"}/${detailedPokeTask.taskName}/level`);
        writeData(detailedPokeTask.date, `${user ? user.uid : "dummy"}/${detailedPokeTask.taskName}/date`)
    })
    const removeLastDate = (dateList) => {
        let dateListCopy = [...dateList]
        dateListCopy.pop();
        return dateListCopy;
    }
    const addCurrentDate = (dateList) => {
        let dateListCopy = [...dateList]
        dateListCopy.push(todayKey);
        return dateListCopy;
    }
    // console.log(`${(detailedPokeTask.level/90)*100}%`)
    return (
        <DetailedTaskLayout>
                <ColorSplash5 id='splash5' />
                <ColorSplash4 id='splash4' />
                <ColorSplash3 id='splash3' />
                <ColorSplash2 id='splash2' />
                <ColorSplash1 id='splash1' />
                <ColorBlender id='color-blender' />

                <DetailedPokeHeader>
                    <svg onClick={() => setDetailedPokeTask({})} width="15" height="26" viewBox="0 0 15 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.8875 2.8375L12.6625 0.625L0.299988 13L12.675 25.375L14.8875 23.1625L4.72499 13L14.8875 2.8375Z" fill="white"/>
                    </svg>
                    {
                        detailedPokeTask.completed 
                        ?
                        <DetailedCompleteToggleBtn onClick={
                            () => setDetailedPokeTask(prevObj => {
                                return {...prevObj, 
                                        completed: !prevObj.completed,
                                        level: prevObj.completed ? prevObj.level - 1 : prevObj.level + 1,
                                        date: !prevObj.completed ? addCurrentDate(prevObj.date) : removeLastDate(prevObj.date)
                                    }
                            })}
                        >
                            <svg width="30" height="23" viewBox="0 0 30 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 17.95L3.05002 11L0.68335 13.35L10 22.6666L30 2.66665L27.65 0.31665L10 17.95Z" fill="#1389D2"/>
                            </svg>
                        </DetailedCompleteToggleBtn>
                        :
                        <DetailedCompleteToggle>
                            <h1>Complete?</h1>
                            <DetailedCompleteToggleBtn onClick={
                                () => setDetailedPokeTask(prevObj => {
                                    return {...prevObj, 
                                            completed: !prevObj.completed,
                                            level: prevObj.completed ? prevObj.level - 1 : prevObj.level + 1,
                                            date: !prevObj.completed ? addCurrentDate(prevObj.date) : removeLastDate(prevObj.date)
                                        }
                                })}
                            >
                                <svg width="30" height="23" viewBox="0 0 30 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 17.95L3.05002 11L0.68335 13.35L10 22.6666L30 2.66665L27.65 0.31665L10 17.95Z" fill="#E1E9F0"/>
                                </svg>
                            </DetailedCompleteToggleBtn>
                        </DetailedCompleteToggle>
                    }
                </DetailedPokeHeader>
                <DetailedPokeContent>
                    <img src={`https://www.serebii.net/swordshield/pokemon/${detailedPokeTask.pokemonNumber}.png`}></img>
                    <DetailedPokeInfo>
                        <h2 data-cy='display-pokemon-nm'>{detailedPokeTask.pokemon}</h2>
                        <h3 data-cy='display-pokemon-lv'>Level {detailedPokeTask.level}</h3>
                    </DetailedPokeInfo>
                    
                    <h1 data-cy='display-task-nm'>{detailedPokeTask.taskName}</h1>
                    
                    <DetailedLevelContainer>
                        <DetailedProgressBar>
                            <DetailedProgressBarFill progress={(detailedPokeTask.level/90)*100 > 100? 100 : (detailedPokeTask.level/90)*100}/>
                        </DetailedProgressBar>
                        <div><h4 style={{color: '#1389D2'}}>{detailedPokeTask.level}</h4><h4> / 90 days until forming lifestyle</h4></div>
                    </DetailedLevelContainer>

                    <DetailedStatsContainer>
                    </DetailedStatsContainer>
                    
                    <DetailedCalendarContainer>
                    </DetailedCalendarContainer>
                </DetailedPokeContent>
            </DetailedTaskLayout>
    );
}

export default DetailedTaskView;