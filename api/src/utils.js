require('dotenv').config();
const fetch = require('node-fetch');
const urlFetch = 'https://api.thedogapi.com/v1/breeds';
const api_key = `?api_key=${process.apiKey}`;
const { Dog, Temperament } = require('./db.js');
const { Op } = require("sequelize");

const uid = () => {
    return Math.random().toString(36).slice(2,12);
};

const saveTemperaments = async () => {
    // Reviso que la base de datos contenga los Temperamentos para no volver a agregarlos y se encuentren repetidos
    const dbTemperaments = await Temperament.findAll();
    if(dbTemperaments.length) return;

    // Obtengo todos los Temperamentos de la API y los guardo en mi Base de Datos
    const dogs = await fetch(urlFetch + api_key).then(data => data.json());
    let temperaments = [];
    dogs.forEach(dog => {
        if(dog.temperament) temperaments.push(...dog.temperament.split(', '));
    });
    temperaments = [...new Set(temperaments)];

    temperaments = temperaments.map(temp => {
        return {name: temp}
    });
    
    await Temperament.bulkCreate(temperaments);
}

// Creo los temperamentos obtenidos en mi Base de Datos, solo 1 vez
saveTemperaments();

module.exports = {
    getDogs : async (name, source, temp, idDog) => {
        // Recibo los datos de la API
        let dog = await fetch(`${urlFetch}${api_key}`).then(data => data.json());
        dog = await dog.map(dog => ({
            id: dog.id,
            name: dog.name,
            life_span: dog.life_span,
            weight: dog.weight.metric,
            height: dog.height.metric,
            temperaments: dog.temperament?.split(', '),
            image: `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`
        }));
        // Recibo los datos de mi Base de Datos
        let dbDogs = await Dog.findAll({include: Temperament});
        dbDogs = await dbDogs.map(dog => ({
            id: dog.id,
            name: dog.name,
            life_span: dog.life_span,
            weight: dog.weight,
            height: dog.height,
            temperaments: dog.temperaments.map(temp => temp.name),
            image: dog.image
        }));
        
        // Filtro los datos según la fuente
        let toFilter = [];
        switch(source){
            case 'apiOnly': toFilter.push(...dog); break;
            case 'createdBreed': toFilter.push(...dbDogs); break;
            case 'allSources': 
            default: toFilter.push(...dog,...dbDogs); break;
        }
        // Aplico los demás filtros en caso que existan
        if(name !== '') toFilter = toFilter.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));
        if(temp !== '') toFilter = toFilter.filter(dog => dog.temperaments?.includes(temp));

        // Ordeno el arreglo de manera ascendente, en caso de contener ambas fuentes, mixeo los datos y los deja ordenados
        toFilter.sort((a, b) => {
            const A = a.name.toLowerCase();
            const B = b.name.toLowerCase()
            if (A < B) return -1;
            if (A > B) return 1;
            return 0;
        })

        // Aplico el filtro idDog en caso que llegue de la ruta(GET /dogs/:idDog)
        if(idDog) toFilter = toFilter.filter(dog => dog.id.toString() === idDog);
        
        return toFilter;
    },
    addDog: (name, min_height, max_height, min_weight, max_weight, min_life_span, max_life_span, image, temperaments) => {
        // Conformo los datos correctamente como los requiere la Base de Datos según el Modelo
        const weight = `${min_weight} - ${max_weight}`
        const height = `${min_height} - ${max_height}`;
        const life_span = `${min_life_span} - ${max_life_span} years`;
        // Valido en caso que no existan duplicados antes de insertar en la Base de Datos
        temperaments = [...new Set(temperaments)];
        
        return Dog.create({
            id: uid(),
            name: name,
            height: height,
            weight: weight,
            life_span: life_span,
            image: image
        }).then(dog => {
            temperaments.forEach(temperament => {
            Temperament.findOne({ where: { name:{ [Op.substring]: temperament }}})
                        .then(temp => dog.addTemperament(temp.id))})
        });
    },
    getTemperaments: async () => {
        // Obtengo todos los Temperamentos de mi Base de Datos
        const temperaments = await Temperament.findAll({
            order: [['name']]
        });
        return temperaments;
    }
}