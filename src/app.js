const path = require('path') //core module
const express = require('express') //npm module
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { request } = require('http')

// console.log(path.join(__dirname, '../public'))

const app = express()

// path for Express config
const viewsPath = path.join(__dirname, '../templates/views')
const parstialsPath = path.join(__dirname, '../templates/partials')

// sets up handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(parstialsPath)

// Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App!',
        name: 'Harshith'
    })
})

// json
app.get('/help', (req, res) => {
    res.render('help',{
        name: 'Harshith',
        title: 'Help'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Me!',
        name: 'Harshith'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => { //setting = {} to default if there is an error
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, data2) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: data2,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    // two responses are not allowed, so we make the first one a return
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help-404',
        info: 'Help not available for selected issue',
        name: 'Harshith'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        info: '404: Invalid url',
        name: 'Harshith'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})