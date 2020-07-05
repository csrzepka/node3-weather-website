const request = require('postman-request');

// const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Etobicoke%20Ontario.json?access_token=pk.eyJ1IjoiY3J6ZXBrYSIsImEiOiJja2IyeHBpYzIwNTFmMnNwNG1vY3JidjV1In0.XZXXLcNmPDHJcheVxgjczw&limit=1';

// request({ url: geocodeURL, json: true }, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to weather servuce');
//     } else if (response.body.features.length == 0) {
//         console.log('No locations found');
//     } else {
//         const location = response.body.features[0].place_name;
//         const latitude = response.body.features[0].center[1];
//         const longitude = response.body.features[0].center[0];
    
//         console.log(`Found location: ${location}`);
//         console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
//     }
// });

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiY3J6ZXBrYSIsImEiOiJja2IyeHBpYzIwNTFmMnNwNG1vY3JidjV1In0.XZXXLcNmPDHJcheVxgjczw&limit=1`;

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