/**
 * Converts epoch time to a Date type
 * @param epoch time to convert
 * @param timeZone local timezone to convert time to - default UTC
 * @returns { String } returns epoch as Date in string format
 */
const EpochToDateTime = (epoch, timeZone = "UTC") => {
    return new Date(epoch*1000).toLocaleString("en-US", {timeZone});
};

/**
 * Converts DateTime string to string of format
 * HH:MM PM
 * @param date string of time
 */
const DateTimeStringToHour = (date) => {
    const timeString = date.substr(date.indexOf(' ') + 1);
    const period = timeString.substr(timeString.indexOf(' ') + 1);
    const hour = timeString.slice(0, timeString.indexOf(' ') - 3);

    return `${hour} ${period}`;
};
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/**
 * Converts temperature from Kelvin to Celcius
 * @param temperature temp in Kelvin
 * @returns { temperature } temp in Celcius
 */
const KelvinToCelcius = (temperature) => {
    const result = (temperature * 100) - 27315;
    return result === 0 ? 0 : result / 100;
};

/**
 * Converts temperature from Kelvin to Fahrenheit
 * @param temperature temp in Kelvin
 * @returns { temperature } temp in Fahrenheit
 */
const KelvinToFahrenheit = (temperature) => {
    return (temperature - 273.15) * 9 / 5 + 32;
};

console.log(days[new Date(1594829055*1000).getDay()]);

var utcSeconds = 1594829055;

/**
 * MM/DD/YYYY
 */
const DateTimeStringToDate = (date) => {
    return date.substr(0, date.indexOf(','));
}

const DateToDay = (date) => {
    const now = new Date(date);

    return `${days[now.getDay()]} ${months[now.getMonth()]} ${now.getDate()} ${now.getFullYear()}`;
}

console.log(DateToDay(DateTimeStringToDate(EpochToDateTime(utcSeconds, "Asia/Shanghai"))));