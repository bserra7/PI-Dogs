const { Router } = require('express');
const postDogRoute = Router();

const { addDog } = require('../utils');

postDogRoute.post('/', (req, res) => {
    const { name, min_height, max_height, min_weight, max_weight, min_life_span, max_life_span, image, temperaments } = req.body;
    addDog(name, min_height, max_height, min_weight, max_weight, min_life_span, max_life_span, image, temperaments)
        .then(() => res.json('Breed added correctly'))
        .catch(error => res.status(404).json('An error has been ocurred: ' + error));
});

module.exports = postDogRoute;