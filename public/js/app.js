const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const address = search.value;

    messageOne.textContent = 'Loading...';

    fetch(`/weather?address=${address}`).then((res) => {
        res.json().then((data) => {
            messageOne.textContent = data.location;
            console.log(data);
            /**
             * The weather endpoint returns two objects
             * @return { forecast }
             * has three seven child objects
             * @return { lat } number - latitude of request location
             * @return { lon } number - longitude of request location
             * @return { timezone } String - timezone of request location
             * @return { timezone_offset } Epoch - timezone offset in Epoch
             * @return { current } object - current weather data
             * @return { hourly } array - contains weather data objects for next 48 hours
             * @return { daily } array - contains weather data objects for 8 days
             */
            UpdateCurrentForecast(data.forecast.current, data.forecast.timezone);

            UpdateHourlyForecast(data.forecast.hourly, data.forecast.timezone);

            UpdateDailyForecast(data.forecast.daily, data.forecast.timezone);
        });
    });
});

/**
 * Injects a text value into an HTML component based off of the component ID
 * @param id the ID of the component to update
 * @param value the value to inject into the component
 */
const InjectValue = (id, value) => {
    document.querySelector(`#${id}`).textContent = value || '--';
};

/**
 * Specific collection of InjectValue() calls to update the current.hbs
 * with the values returned from the WeatherOneCall API
 * @param current the current object returned by the API
 * @param timezone the timezone of the location
 */
const UpdateCurrentForecast = (current, timezone) => {
    const icon = document.querySelector('#current-icon');
    icon.setAttribute('src', `/icons/${IconDictionary[current.weather[0].icon] || 'maintenance'}.svg`);
    icon.setAttribute('alt', current.weather[0].description);

    InjectValue('cf-weather-main', current.weather[0].description);
    InjectValue('cf-temp', `${current.temp}°C`);
    InjectValue('cf-feels', `Feels like ${current.feels_like}°C`);

    InjectValue('cd-sunrise', DateTimeStringToHour(EpochToDateTime(current.sunrise, timezone)));
    InjectValue('cd-sunset', DateTimeStringToHour(EpochToDateTime(current.sunset, timezone)));
    InjectValue('cd-pressure', current.pressure);
    InjectValue('cd-humidity', current.humidity);
    InjectValue('cd-dew-point', current.dew_point);
    InjectValue('cd-uv-index', current.uvi);
    InjectValue('cd-wind', current.wind_speed); // need to add in direction
    InjectValue('cd-visibility', current.visibility);
};

/**
 * Injects hourly forecast data from OneCallAPI
 * @param hourly the hourly array returned by the API
 * @param timezone the timezone of the location
 */
const UpdateHourlyForecast = (hourly, timezone) => {
    let forecastHourly = document.querySelector('.hourly');
    let i = 0;

    // Clear out old hourly data
    while (forecastHourly.firstChild) {
        forecastHourly.removeChild(forecastHourly.lastChild);
    }

    // Add in new hourly data
    hourly.forEach(hour => {
        let div = document.createElement('div');
        div.setAttribute('id', `fh-unit-${i}`);
        div.setAttribute('class', 'fh-unit');

        let time = document.createElement('span');
        time.setAttribute('id', `time-${i}`);
        time.textContent = i == 0 ? 'NOW' : DateTimeStringToHour(EpochToDateTime(hour.dt, timezone));
        div.appendChild(time);

        let icon = document.createElement('span');
        icon.setAttribute('id', `hour-icon-${i}`);
        let img = document.createElement('img');
        img.setAttribute('src', `/icons/${IconDictionary[hour.weather[0].icon] || 'maintenance'}.svg`);
        img.setAttribute('alt', hour.weather[0].description);
        icon.appendChild(img);
        div.appendChild(icon);

        let temp = document.createElement('span');
        temp.setAttribute('id', `temp-${i}`);
        temp.textContent = `${hour.temp}°C`;
        div.appendChild(temp);

        let feel = document.createElement('span');
        feel.setAttribute('id', `feels-${i}`);
        feel.textContent = `${hour.feels_like}°C`;
        div.appendChild(temp);

        forecastHourly.appendChild(div);
        i++;
    });
};

/**
 * Injects hourly forecast data from OneCallAPI
 * @param daily the hourly array returned by the API
 * @param timezone the timezone of the location
 */
const UpdateDailyForecast = (daily, timezone) => {
    let forecastDaily = document.querySelector('.daily');
    let i = 0;

    // Clear out old daily data
    while (forecastDaily.firstChild) {
        forecastDaily.removeChild(forecastDaily.lastChild);
    }

    // Add in new hourly data
    daily.forEach(day => {
        if (i != 0) {
            let div = document.createElement('div');
            div.setAttribute('id', `fd-unit-${i}`);
            if (i % 2) {
                div.setAttribute('class', 'fd-unit');
            } else {
                div.setAttribute('class', 'fd-unit fd-grey');
            }

            // MAIN WEATHER INFO FOR DAY
            let dayName = document.createElement('span');
            dayName.setAttribute('id', `fd-day-${i}`);
            dayName.textContent = i == 0 ? 'TODAY' : DateToWeekday(DateTimeStringToDate(EpochToDateTime(day.dt, timezone)), true);
            div.appendChild(dayName);

            let date = document.createElement('span');
            date.setAttribute('id', `fd-date-${i}`);
            date.textContent = DateTimeStringToDate(EpochToDateTime(day.dt, timezone));
            div.appendChild(date);

            let desc = document.createElement('span');
            desc.setAttribute('id', `fd-desc-${i}`);
            desc.textContent = day.weather[0].description;
            div.appendChild(desc);

            let icon = document.createElement('span');
            icon.setAttribute('id', `fd-icon-${i}`);
            let img = document.createElement('img');
            img.setAttribute('src', `/icons/${IconDictionary[day.weather[0].icon] || 'maintenance'}.svg`);
            img.setAttribute('alt', day.weather[0].description);
            icon.appendChild(img);
            div.appendChild(icon);

            let temp = document.createElement('span');
            temp.setAttribute('id', `fd-temp-${i}`);
            temp.textContent = day.temp.day;
            div.appendChild(temp);

            // EXTRA INFO FOR DAY
            let feels = document.createElement('span');
            feels.setAttribute('id', `fd-feels-like-${i}`);
            feels.textContent = day.feels_like.day;
            div.appendChild(feels);

            let night = document.createElement('span');
            night.setAttribute('id', `fd-night-${i}`);
            night.textContent = day.temp.night;
            div.appendChild(night);

            let humidity = document.createElement('span');
            humidity.setAttribute('id', `fd-humidity-${i}`);
            humidity.textContent = day.humidity;
            div.appendChild(humidity);

            let wind = document.createElement('span');
            wind.setAttribute('id', `fd-wind-${i}`);
            wind.textContent = `${day.wind_speed} ${DegreeToDirection(day.wind_deg)}`;
            div.appendChild(wind);

            let uvi = document.createElement('span');
            uvi.setAttribute('id', `fd-uv-index-${i}`);
            uvi.textContent = day.uvi;
            div.appendChild(uvi);

            let sunrise = document.createElement('span');
            sunrise.setAttribute('id', `fd-sunrise-${i}`);
            sunrise.textContent = DateTimeStringToHour(EpochToDateTime(day.sunrise, timezone));
            div.appendChild(sunrise);

            let sunset = document.createElement('span');
            sunset.setAttribute('id', `fd-sunset-${i}`);
            sunset.textContent = DateTimeStringToHour(EpochToDateTime(day.sunset, timezone));
            div.appendChild(sunset);

            forecastDaily.appendChild(div);
        };
        i++;
    });
};

/**
 * Converts epoch time to a Date type
 * @param epoch time to convert
 * @param timeZone local timezone to convert time to - default UTC
 * @returns { String } returns epoch as Date in string format
 */
const EpochToDateTime = (epoch, timeZone = "UTC") => {
    return new Date(epoch * 1000).toLocaleString("en-US", { timeZone });
};

/**
 * Converts DateTime string to string of format
 * HH:MM (AM/PM)
 * @param date string of locale time
 */
const DateTimeStringToHour = (date) => {
    const timeString = date.substr(date.indexOf(' ') + 1);
    const period = timeString.substr(timeString.indexOf(' ') + 1);
    const hour = timeString.slice(0, timeString.indexOf(' ') - 3);

    return `${hour} ${period}`;
};

/**
 * Converts DateTime string to string of format
 * MM/DD/YYYY
 * @param date string of locale time
 */
const DateTimeStringToDate = (date) => {
    return date.substr(0, date.indexOf(','));
}

/**
 * Converts MM/DD/YYYY string to day of week
 * @param date string of format 'MM/DD/YYYY'
 * @param shortHand boolean to output day as shorthand abbreviation
 */
const DateToWeekday = (date, shortHand = false) => {
    const now = new Date(date);
    return shortHand ? DaysShort[now.getDay()] : Days[now.getDay()];
}

/**
 * Converts the direction in degrees to a compass location
 * @param direction direction in degrees
 */
const DegreeToDirection = (direction) => {
    if (direction <= 11.25) {
        return 'N';
    } else if (direction < 33.75) {
        return 'NNE';
    } else if (direction <= 56.25) {
        return 'NE';
    } else if (direction < 78.75) {
        return 'ENE';
    } else if (direction <= 101.25) {
        return 'E';
    } else if (direction < 123.75) {
        return 'ESE';
    } else if (direction <= 146.25) {
        return 'SE';
    } else if (direction < 168.75) {
        return 'SSE';
    } else if (direction <= 191.25) {
        return 'S';
    } else if (direction < 213.75) {
        return 'SSW';
    } else if (direction <= 236.25) {
        return 'SW';
    } else if (direction < 258.75) {
        return 'WSW';
    } else if (direction <= 281.25) {
        return 'W';
    } else if (direction < 303.75) {
        return 'WNW';
    } else if (direction <= 326.25) {
        return 'NW';
    } else if (direction < 348.75) {
        return 'NNW';
    } else {
        return 'N';
    }
}

/**
 * OpenWeatherMapAPI icon code to img dictionary
 * https://openweathermap.org/weather-conditions
 */
const IconDictionary = {
    '01d': 'day',
    '01n': 'night',
    '02d': 'cloudy-day',
    '02n': 'cloudy-night',
    '03d': 'cloudy',
    '03n': 'cloudy',
    '04d': 'cloudy',
    '04n': 'cloudy',
    '09d': 'rainy-heavy',
    '09n': 'rainy-heavy',
    '10d': 'rainy-sunny',
    '10n': 'rainy-light', // TODO: create custom for night
    '11d': 'thunder',
    '13d': 'snowy',
    // '50d': 'mist' no icon for mist TODO: create
};

/**
 * Days of the week lookup table
 * Uses full weekday names
 */
const Days = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

/**
 * Days of the week lookup table
 * Uses short hand abbreviation of days
 */
const DaysShort = [
    'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'
];

/**
 * Months of the year lookup table
 * Uses full month names
 */
const Months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
];

/**
 * Months of the year lookup table
 * Uses short hand abbreviation of months
 */
const MonthsShort = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
];