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
    DetailedStats,
    DetailedStatBox,
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
    const calculateStreak = () => {
        let thisDate = new Date();
        let streak = 0;
        const filteredDates = detailedPokeTask.date.filter(date => date !== '');
        const filteredDatesReversed = filteredDates.slice(0).reverse();
        const dateObjList = filteredDatesReversed.map(
            dateStr => {
                const dateStrSplit = dateStr.split('/')
                return new Date(parseInt(dateStrSplit[3])+1900, parseInt(dateStrSplit[1]), parseInt(dateStrSplit[2]))
            }
        );
        for (const date of dateObjList){
            if (Math.floor((thisDate.getTime() - date.getTime())/86400000) === 0){
                streak ++;
            }
            else if(Math.floor((thisDate.getTime() - date.getTime())/86400000) === 1){
                streak ++;
                thisDate = date;
            }
            else{
                streak = 0;
                return streak;
            }
        }
        return streak;
    }
    // console.log(calculateStreak())
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
                        <h1>Stats</h1>
                        <DetailedStats>
                            <DetailedStatBox>
                                <h1>{calculateStreak()}</h1>
                                <p>DAY STREAK</p>
                            </DetailedStatBox>
                            <DetailedStatBox>
                                <h1>{detailedPokeTask.level > 21 ? 21 : detailedPokeTask.level}/21</h1>
                                <p>TO FORM HABIT</p>
                            </DetailedStatBox>
                            <DetailedStatBox>
                                <h1>{detailedPokeTask.level > 90 ? 90 : detailedPokeTask.level}/90</h1>
                                <p>TO FORM LIFESTYLE</p>
                            </DetailedStatBox>
                        </DetailedStats>
                    </DetailedStatsContainer>
                    
                    <DetailedCalendarContainer>
                    </DetailedCalendarContainer>

                </DetailedPokeContent>
            </DetailedTaskLayout>
    );
}

export default DetailedTaskView;