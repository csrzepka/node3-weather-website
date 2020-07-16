const request = require('postman-request');
const { mapbox_api } = require('../env');

/**
 * Get geocode location of entered location (Latitude and Longitude)
 * @param address name, or postal code of address to find data on
 * @param callback returns JSON data containing latitude and longitude of entered address
 */
const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapbox_api}&limit=1`;

    request({ url: url, json: true }, (error, { body: {features} = {} } = {}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (features.length == 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            callback(undefined, {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name
            });
        };
    });
};

module.exports = geocode;