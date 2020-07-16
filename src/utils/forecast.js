const request = require('postman-request');
const { weather_api } = require('../env');

/**
 * Get current weather data from WeatherStackAPI
 * @param lat latitude of location to get weather data
 * @param lon longitude of location to get weather data
 * @param callback  callback of request returning data in JSON format
 */
const forecast = (lat, lon, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${weather_api}&units=metric`;

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback(`Error ${body.error.code} - ${body.error.info}`, undefined);
        } else {
            callback(undefined, body);
        };
    });
};

module.exports = forecast;