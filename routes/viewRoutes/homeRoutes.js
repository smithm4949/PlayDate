const router = require('express').Router();
const eventController = require('../controllers/eventController');

const SerpApi = require('google-search-results-nodejs');
const axios = require("axios")
require('dotenv').config();

// There are view routes prepended by [rootURL].com/

router.get('/', async (req, res) => {
    eventController.getAll(req, res)
    .then(events => {
        console.log("----- INSIDE EVENT CONTROLLER -----")
        plainEvents = events.map(event => event.get({ plain: true }));
        console.log(plainEvents);
        res.status(200).render('homepage', {
            events: plainEvents,
            logged_in: req.session.logged_in
        });
      })
      .catch(err => {
        console.log(err);
        res.render('homepage', {
            events: [],
            logged_in: req.session.logged_in
        });
      })

    //   if (req.session.location_zip) {
    //     geocode(req.session.location_zip)
    //   } else {
    //     geocode(20001)
    //   }


});

router.get('/login', (req, res) => {
    //Renders login handlebars template on the login page
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/signup', (req, res) => {
    //Renders signup handlebars template on the signup page
    res.render('signup', {
        logged_in: req.session.logged_in
    });
});


router.get('/results/:zip', (req, res) => {
    
    const zip = req.params.zip

    req.session.save(() => { 
        req.params.zip = zip
    })


    // console.log(req.params.zip)
    // console.log(process.env)

    // console.log(process.env)

    // console.log(req.params.zip)


        // console.log(req.body.zip)

        // geocode(req.body.zip)

        

        // const data = res.json(fn)

        // res.send(data)

    const formattedCoords = '@'

    var query = function (coords) {

        const search = new SerpApi.GoogleSearch(process.env.QUERY_KEY);

        const params = {
            engine: "google_maps",
            type: "search",
            google_domain: "google.com",
            q: "Park",
            hl: "en",
            ll: coords
        };

        const callback = function(data) {
            // console.log(data);
            res.json(data)

            
        };

        // Show result as JSON
        return search.json(params, callback);
    }


    var geocode = function (zip) {
        const zipformat = JSON.parse(zip)

        const options = {
        method: 'GET',
        url: 'https://google-maps-geocoding.p.rapidapi.com/geocode/json',
        params: {address: `${zipformat}`, language: 'en'},
        headers: {
            'X-RapidAPI-Key': process.env.GEO_KEY,
            'X-RapidAPI-Host': 'google-maps-geocoding.p.rapidapi.com'
        }
        };

        axios.request(options).then(function (response) {

            let lat = JSON.stringify(response.data.results[0].geometry.location.lat)
            let long = JSON.stringify(response.data.results[0].geometry.location.lng)

            let result = formattedCoords.concat(lat, ", ", long, ",14z")

            console.log(lat)
            console.log(long)
            query(result)

        }).catch(function (error) {
            console.error(error);
        });
    }

    geocode(zip)


    

});

module.exports = router;