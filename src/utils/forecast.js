const request = require('postman-request');

// const weatherURL = 'http://api.weatherstack.com/current?access_key=bf1330f5c9d7bd5e3c550cc8c3f27e92&query=43.6436,-79.5656';

// request({ url: weatherURL, json: true }, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to weather service!');
//     } else if (response.body.error) {
//         console.log(`Error ${response.body.error.code} - ${response.body.error.info}`);
//     } else {
//         console.log(`It is currently ${response.body.current.temperature} degrees out. It feels like ${response.body.current.feelslike} degrees out.`)
//     }
// });

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=bf1330f5c9d7bd5e3c550cc8c3f27e92&query=${latitude},${longitude}`;

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback(`Error ${body.error.code} - ${body.error.info}`, undefined);
        } else {
            callback(undefined, `It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.`);
        };
    });
};

module.exports = forecast;