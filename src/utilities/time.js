export const today = new Date();

export const todayKey = `${today.getDay()}/${today.getMonth()}/${today.getDate()}/${today.getYear()}`;

export const DAY_MAP = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const MONTH_MAP = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'Septempber', 'October', 'November', 'December'];

export const getDate = () => {
    const month = MONTH_MAP[today.getMonth()];
    const day = DAY_MAP[today.getDay()];
    const date = today.getDate();
    return day + ', ' + month + ' ' + date;
}