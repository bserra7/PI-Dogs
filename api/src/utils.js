require('dotenv').config();
const fetch = require('node-fetch');
const { response } = require('./app.js');
const urlFetch = 'https://api.thedogapi.com/v1/breeds';
const api_key = `?api_key=${process.apiKey}`;
const { Dog, Temperament } = require('./db.js');

const uid = () => {
    return Math.random().toString(36).slice(2,12);
};

module.exports = {
    saveTemperaments : async () => {
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
    },
    getDogs : async (param) => {
        if (isNaN(param) && param){
            const dog = await fetch(`${urlFetch}/search${api_key}&q=${param}`).then(data => data.json());
            if(!dog){
                // VER BIEN METODO DE BUSQUEDA DE SEQUELIZE
                const dbDog = Dog.findAll({
                    where:{
                        name: param
                    }
                })
                return dbDog;
            }
            return dog;
        }else {
            let results = await fetch(urlFetch + api_key).then(data => data.json());
            results = await results.map(dog => ({
                id: dog.id,
                name: dog.name,
                life_span: dog.life_span,
                weight: dog.weight.metric,
                height: dog.height.metric,
                temperaments: dog.temperament?.split(', '),
                image: dog.image.url
            }));
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
            results.push(...dbDogs);
            if(param){
                const finded = await results.find(breed => breed.id === Number(param));
                return finded;
            }
            return results;
        }    
    },
    addDog: (name, min_height, max_height, min_weight, max_weight, min_life_span, max_life_span, image, temperaments) => {
        // Conformo los datos correctamente como los requiere la Base de Datos según el Modelo
        const weight = `${min_weight} - ${max_weight}`
        const height = `${min_height} - ${max_height}`;
        const life_span = `${min_life_span} - ${max_life_span}`;
        // Valido en caso que existan duplicados antes de insertar en la Base de Datos
        temperaments = [...new Set(temperaments)];
        Dog.create({
            id: uid(),
            name: name,
            height: height,
            weight: weight,
            life_span: life_span,
            image: image
        }).then(dog => {
            dog.setTemperaments(temperaments);
        })
    },
    getTemperaments: async () => {
        // Obtengo todos los Temperamentos de mi Base de Datos
        const temperaments = await Temperament.findAll({
            attributes: ['id', 'name']
        });
        return temperaments
    }
}