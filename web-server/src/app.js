/** set: changes settings for express
 * use: uses static files
 * get: sets up response for accing urls
 * listen: sets up server
**/

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


// set up server
const app  = express()

// sets paths
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// configures express to view HBS files
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// express uses static files in public folder
app.use(express.static(publicDirectoryPath))

// sets up express responses to urls
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jonah Kim'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jonah Kim'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        help: 'Help message here!',
        title: 'Help',
        name: 'Jonah Kim'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    location = req.query.address
    geocode(location, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                location,
                forecastData
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jonah Kim',
        error: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jonah Kim',
        error: 'Page not found.'
    })
})



// start server up and listens on a specific port
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})


