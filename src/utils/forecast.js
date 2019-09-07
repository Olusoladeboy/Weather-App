const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/d9f280176056f67e75cd560a4c3f66a7/' + latitude + ',' + longitude + '?units=us';

    request({url, json: true}, (error, { body } = {}) => {
        if(error){
            callback('Error: Unable to connect to forecast services', undefined)
        } else if(body.error) {
            callback(body.error, undefined)
        } else{
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain');
        }
    });
}


module.exports = forecast;