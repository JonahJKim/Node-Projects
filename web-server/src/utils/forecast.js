const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=21f510765ea6d4479395916b36c0bfac&query=' + long + ',' + lat + '&units=f'

    request({ url, json: true}, (error, {body}={}) => {
        if (error) {
            callback('Unable to connect', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out! It feels like ' + body.current.feelslike + ' degrees.\nThe UV index is ' + body.current.uv_index + '.')
        }
    })
}

module.exports = forecast

