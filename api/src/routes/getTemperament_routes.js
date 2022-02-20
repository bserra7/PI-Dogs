const { Router } = require('express');
const getTemperamentsRoute = Router();

const { getTemperaments } = require('../utils.js');

getTemperamentsRoute.get('/', (req, res) => {
    getTemperaments()
        .then(data => res.json(data))
        .catch(error => res.status(404).json('Cant get Temperaments: ' + error));
});

module.exports = getTemperamentsRoute;
