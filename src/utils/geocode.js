const request = require('request')


//COORDINDATES

const geocode = (address, callback) => {
    const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYWRpbC1tIiwiYSI6ImNrOGNtdWxwbjBuN3IzZW1qam41bzBpODYifQ.6a9JZ_a2c0P7PpqxmBgShA&limit=1'
    
    request ({ url, json: true}, (error, { body }) => {
 
      if (error) {
          callback('Unable to connect to server', undefined) 
      }
       else if (body.features.length === 0) {
            callback ('Incorrect Entry', undefined)
       }  
       else {
            callback (undefined, {
               latitude: body.features[0].center[1],
               longitude: body.features[0].center[0],
               location: body.features[0].place_name

           })
       }
 
   })
 
}

module.exports = geocode