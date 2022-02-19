const { Router } = require('express');
const router = Router();

const { getDogs, addDog, getTemperaments, searchDogs } = require('../utils.js');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get('/dogs', async (req, res) => {
    const { name = '', source = 'allSources', temp = '' } = req.query;
    const results = await getDogs(name, source, temp);
    if(!results.length) return res.status(404).json("Breeds can't be founded");
    res.json(results);    
});

router.get('/dogs/:idDog', async (req, res) => {
    const { source = 'allSources', temp = '' } = req.query;
    const { idDog } = req.params;
    console.log(idDog);
    const finded = await getDogs('', source, temp, idDog);
    if(!finded.length) return res.status(404).json("Breed with id: "+ idDog +" can't be found");
    res.json(finded);    
});

router.get('/temperament', (req, res) => {
    getTemperaments()
    .then(data => res.json(data))
    .catch(error => res.status(404).json('Cant get Temperaments: ' + error));
});

router.post('/dog', (req, res) => {
    const {name, min_height, max_height, min_weight, max_weight, min_life_span, max_life_span, image, temperaments} = req.body;
    addDog(name, min_height, max_height, min_weight, max_weight, min_life_span, max_life_span, image, temperaments)
    .then(() => res.json('Breed added correctly'))
    .catch(error => res.status(404).json('An error has been ocurred: ' + error));
});

module.exports = router;
