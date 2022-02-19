require('dotenv').config();
const fetch = require('node-fetch');
const urlFetch = 'https://api.thedogapi.com/v1/breeds';
const api_key = `?api_key=${process.apiKey}`;
const { Dog, Temperament } = require('./db.js');
const { Op } = require("sequelize");

const uid = () => {
    return Math.random().toString(36).slice(2,12);
};

module.exports = {
    saveTemperaments : async (test) => {
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
        test();
    },
    getDogs : async (name, source, temp, idDog) => {
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
        
        let toFilter = [];
        switch(source){
            case 'apiOnly': toFilter.push(...dog); break;
            case 'createdBreed': toFilter.push(...dbDogs); break;
            case 'allSources': 
            default: toFilter.push(...dog,...dbDogs); break;
        }
        console.log('Todos: ' + toFilter.length);
        if(name !== '') toFilter = toFilter.filter(dog => dog.name.includes(name));
        console.log('Name: ' + toFilter.length);
        if(idDog) toFilter = toFilter.filter(dog => dog.id === Number(idDog));
        console.log('ID: ' + toFilter.length);
        if(temp !== '') toFilter = toFilter.filter(dog => dog.temperaments?.includes(temp));
        console.log('Temp: ' + toFilter.length);

        toFilter.sort((a, b) => {
            const A = a.name.slice(0,3).toLowerCase();
            const B = b.name.slice(0,3).toLowerCase()
            if (A < B) return -1;
            if (A > B) return 1;
            return 0;
        })
        
        return toFilter;
    },
    getDogs2 : async (param) => {
        // TRAE LA RAZA SOLO POR EL NOMBRE
        if (isNaN(param) && param){
            let dog = await fetch(`${urlFetch}/search${api_key}&q=${param}`).then(data => data.json());
            dog = await dog.map(dog => ({
                id: dog.id,
                name: dog.name,
                life_span: dog.life_span,
                weight: dog.weight.metric,
                height: dog.height.metric,
                temperaments: dog.temperament?.split(', '),
                image: `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`
            }));
            // Además de los encontrados en la API, incluyos los existentes en la base de Datos que coincidan
            const dbDog = await Dog.findAll({
                where: { name:{ [Op.substring]: param }}
            });
            await dog.push(...dbDog);
    
            return dog;
        }else {
            // TRAE TODAS LAS RAZAS
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
            // obtengo las razas creadas que están en la BD e incluyo los temperamentos
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
            results.sort((a, b) => {
                const A = a.name.slice(0,3).toLowerCase();
                const B = b.name.slice(0,3).toLowerCase()
                if (A < B) return -1;
                if (A > B) return 1;
                return 0;
            })
            if(param){
                const finded = await results.find(breed => breed.id === Number(param));
                return [finded];
            }
            return results;
        }    
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
                        .then(temp => dog.addTemperament(temp.id))
        })
        })
    },
    getTemperaments: async () => {
        // Obtengo todos los Temperamentos de mi Base de Datos
        const temperaments = await Temperament.findAll({
            order: [['name']]
        });
        return temperaments;
    },
    hardCodeTests: async () => {
        
    //HARDCODEO PARA PRACTICA
    for (let i = 1; i <= 5; i++) {
        await Dog.create({
        id: uid(),
        name: 'American Test' + i,
        height: `${2*i} - ${3*i}`,
        weight: `${8*i/4} - ${9*i/3}`,
        life_span: `${5*i/2} - ${8*i/2} years`,
        image: 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/119509859/original/a4b4d447d4d4223232912ba81768f00177de6565/do-animal-dog-cat-pet-illustration-cartoon-caricature.png'
    }).then(dog => {
        dog.setTemperaments([i]);
    })}
    }
}