const { Router } = require('express');
const getDogsRoute = Router();

const { getDogs } = require('../utils.js');

getDogsRoute.get('/', async (req, res) => {
    const { name = '', source = 'allSources', temp = '' } = req.query;
    const results = await getDogs(name, source, temp);
    if (!results.length) return res.status(404).json("Breeds can't be founded");
    res.json(results);
});

getDogsRoute.get('/:idDog', async (req, res) => {
    const { source = 'allSources', temp = '' } = req.query;
    const { idDog } = req.params;
    const finded = await getDogs('', source, temp, idDog);
    if (!finded.length) return res.status(404).json("Breed with id: " + idDog + " can't be found");
    res.json(finded);
});

module.exports = getDogsRoute;