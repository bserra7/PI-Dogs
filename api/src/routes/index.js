const { Router } = require('express');
const router = Router();

const getDogsRoute = require('./getDogs_routes.js');
const getTemperamentsRoute = require('./getTemperament_routes.js');
const postDogRoute = require('./postDog_routes.js');


router.use('/dogs', getDogsRoute);

router.use('/temperament', getTemperamentsRoute);

router.use('/dog', postDogRoute);

module.exports = router;
