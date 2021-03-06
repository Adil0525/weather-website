const path = require('path')
const express  = require ('express')
const hbs = require ('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPatch = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set ('view engine', 'hbs')
app.set ('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to search
app.use (express.static(publicDirectoryPatch))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Md Adil' 
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Md Adil'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Md Adil',
        helpText: 'This app helps with weather updates'
    })
})

app.get('/weather', (req, res) => {  
    if (!req.query.address)
    return res.send ({
        error: 'Please provide an address'
    })

    geocode (req.query.address, (error, { latitude, longitude, location } = {} ) => {
      if (error) 
      return res.send ({ error })

      forecast (latitude , longitude, (error, forecastData) => {
          if (error) {
          return res.send({ error })
         }

            res.send ({
             forecast: forecastData,
             location,
             address: req.query.address 
            })
        })
    })
     
    // console.log(req.query.address)
    // res.send({
    //     forecase: 'It is clear and hot',
    //     location: 'Noida',
    //     address: req.query.address
    // })
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send ({
            error: 'Provide a search text'
        })
        
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})



app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: 'Md Adil',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: 'Md Adil',
        errorMessage: 'Generic 404 Page Not Found'
    })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
