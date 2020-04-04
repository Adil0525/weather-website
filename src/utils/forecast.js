const request = require('request')

//FORECAST
const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/03ede761b0ff921c366045f70ce08071/' + latitude + ',' + longitude + ''
     
    request ({url, json: true}, (error, { body }) => {
       
       if (error) { 
        callback('unable to connect to API', undefined)
       } 
        else if (body.error) {
            callback('Unable to find the coordinates', undefined)
        }
        else { 
        callback (undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is ' + 
          body.currently.precipProbability + '% chances of rain')
        
        }
      })
    }


module.exports = forecast