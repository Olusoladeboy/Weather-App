// Importing required packages
const express = require('express');
const path = require('path');
const hbs = require('hbs')
const app = express();
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// configuring paths
const publicdirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


// setUp handlebars location and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

// Configuring a static directory to serve
app.use(express.static(publicdirectoryPath))

// configuring the process environment variables
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.render("index", {
        title: 'Weather App'
    });
})

app.get('/weather', (req, res) => {
    // res.render('weather', {
    //     title: 'Weather Page'
        
    // })
    if(!req.query.address) {
        return res.send({
            error: 'Pleae provide an address'
        })
    }
    const address = req.query.address
    geocode(address, (error, { latitude, longitude, place_name} = {}) => {
        if(error){
            return res.send(error)
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            if(error){
                return res.send(error)
            }
            res.send({
                forecast: forecastdata,
                location: place_name,
                address: req.query.address
            })
        });    
    });
    // res.send({
    //     forecast: "It's Currently raining",
    //     location: req.query.address
    // })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page'
    })
});

app.get("*", (req, res) => {
    res.render("404", {
        title: 'My 404 page'
    })
})



// Server listener
app.listen(port, () => {
    console.log('server is running on localhost: ' + port)
});