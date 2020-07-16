const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    weather_api: process.env.OPENWEATHER_API,
    mapbox_api: process.env.MAPBOX_API,
    port: process.env.PORT
};