const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoib2x1c29sYWRlYm95IiwiYSI6ImNqeGZiY3AzcDA0YnEzenAzdTNrejg5emIifQ.A12ZUT4R3KY6xjE_w2_mxA&limit=2'
    
    request({url, json: true}, (error, { body } = {}) => {
        if(error){
            callback('Error: Unable to connect to the internet', undefined);
        } else if(body.error) {
            callback(body.error, undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                place_name: body.features[0].place_name
            });
        }
    });
}


module.exports = geocode;