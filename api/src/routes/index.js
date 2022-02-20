const { Router } = require('express');
const router = Router();

const { addDog, getTemperaments } = require('../utils.js');
const getDogsRoute = require('./getDogs_routes.js');
const getTemperamentsRoute = require('./getTemperament_routes.js');
const postDogRoute = require('./postDog_routes.js');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.use('/dogs',getDogsRoute);

router.use('/temperament',getTemperamentsRoute);

router.use('/dog',postDogRoute);

module.exports = router;
