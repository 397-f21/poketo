import styled from 'styled-components';

export const TitleLayout = styled.div`
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

export const AppTitle = styled.p`
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

export const MainLayout = styled.div`
        height: 100vh;
        width: 100vw;
        display: flex;
        align-items: center;
        position: fixed; //To ensure that "ColorSplashes" do not make the screen scroll
        flex-direction: column;
        background: #84A7EA;
        z-index: 0;
    `

export const Header = styled.div`
        display: flex;
        width: 100%;
        height: 35%;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    `

export const HeaderDate = styled.p`
        font-family: Poppins;
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        line-height: 30px;
        /* text-align: center; */
        color: #FFFFFF;
        z-index: 1;
    `

export const HabitCount = styled.p`
        font-family: 'Source Sans Pro', sans-serif;
        font-weight: 900;
        font-size: 40px;
        line-height: 30px;
        /* text-align: center; */
        color: #FFFFFF;
        margin: 0px;
        z-index: 1;
    `
export const HabitsToGo = styled.p`
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

export const Content = styled.div`
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
    
export const DetailedTaskLayout = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    position: fixed; //To ensure that "ColorSplashes" do not make the screen scroll
    flex-direction: column;
    background: #84A7EA;
    z-index: 0;
`

export const DetailedPokeHeader = styled.div`
    display: flex;
    z-index: 1;
    width: 90%;
    height: 10%;
    min-height: 60px;
    align-items: center;
    justify-content: space-between;
    >svg{
        :hover{
            cursor: pointer;
        }
    }
    /* padding-left: 30px; */
`

export const DetailedPokeContent = styled.div`
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

export const DetailedCompleteToggle = styled.div`
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

export const DetailedCompleteToggleBtn = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 46px;
    height: 46px;
    background: #FFFFFF;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
    border-radius: 50%;
    border: none;
    :hover{
        cursor: pointer;
    }
`

export const DetailedPokeInfo = styled.div`
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

export const DetailedLevelContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 330px;
    min-height: 64px;
    background: #FFFFFF;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
    border-radius: 20px;
    margin-bottom: 10px;
    h4{
        font-family: Poppins;
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        margin: 0;
        display: inline;
        /* margin-top: 5px; */
    }
`

export const DetailedProgressBar = styled.div`
    display: flex;
    align-items: center;
    /* padding: 0 5px 0 5px; */
    width: 306px;
    height: 23.54px;
    background: #F3F6FD;
    border-radius: 20px;
    overflow-y: hidden;
`

export const DetailedProgressBarFill = styled.div`
    width: ${props => props.progress}%;
    height: 100%;
    border-radius: 20px;
    background: linear-gradient(90deg, #7FFABF 0%, #2AC4E6 100%);
`

export const DetailedStatsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 330px;
    min-height: 138px;
    background: #FFFFFF;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
    border-radius: 20px;
    margin-bottom: 10px;
    >h1{
        margin:0;
        font-family: Poppins;
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        color: #494949;
    }
`

export const DetailedStats = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 45%;
    width: 95%;
`

export const DetailedStatBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: calc(100%/3);
    height: 100%;
    >h1{
        margin:0;
        font-family: Source Sans Pro;
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        color: #494949;
    }
    >p{
        margin: 0;
        font-family: Source Sans Pro;
        font-size: 10px;
        color: #5e5e5e;
    }
`

export const DetailedCalendarContainer = styled.div`
    width: 330px;
    min-height: 191px;
    background: #FFFFFF;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
    border-radius: 20px;
    margin-bottom: 10px;
`