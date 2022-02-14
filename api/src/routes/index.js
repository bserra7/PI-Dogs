const { Router } = require('express');
const router = Router();

const { getDogs, addDog, getTemperaments } = require('../utils.js');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get('/dogs', async (req, res) => {
    const { name } = req.query;
    const results = await getDogs(name);
    if(!results.length) return res.status(404).send('La raza no se encuentra');
    res.send(results);
});

router.get('/dogs/:idDog', async (req, res) => {
    const { idDog } = req.params;
    const finded = await getDogs(idDog);;
    res.send(finded);
});

router.get('/temperament', (req, res) => {
    getTemperaments().then(data => res.json(data));
});

router.post('/dog', (req, res) => {
    const {name, min_height, max_height, min_weight, max_weight, min_life_span, max_life_span, image, temperaments} = req.body;
    addDog(name, min_height, max_height, min_weight, max_weight, min_life_span, max_life_span, image, temperaments);
    res.send('Raza agregada correctamente');
});

module.exports = router;
