const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');
const agent = session(app);

const dog = {
  id: 'some10char',
  name: 'Sam',
  height: '25 - 30',
  weight: '8 - 10',
  life_span: '15 - 20',
  image: 'someBase64ImageData',
  temperaments: []
};

describe('Test de API', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('No es posible conectar a la base de datos:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  after(() => Dog.sync({ force: true }))
    
  describe('GET /dogs', () => {
    it('Deberia responder con status 200', () => agent.get('/dogs').expect(200));
    it('Deberia responder con status 200 cuando se le hace una peticion por query', () => agent.get('/dogs?name=Sam').expect(200));
    it('Deberia devolver un arreglo con las razas encontradas por query', () => agent.get('/dogs?name=Sam&Source=createdBreed&temp=')
    .expect('Content-Type', /json/)
    .expect(res => {
      expect(res.body[0]).to.eql(dog)
    }));
  });

  describe('GET /dogs/:idDog', () => {
    it('Deberia responder con status 200 cuando el id existe', () => agent.get('/dogs/some10char').expect(200));
    it('Deberia devolver un arreglo, con la raza encontrada', () => 
    agent.get('/dogs/some10char')
    .expect('Content-Type', /json/)
    .expect(res => {
      expect(res.body[0]).to.eql(dog)
    }));
    it('Deberia responder con status 404 con un id inexistente', () => agent.get('/dogs/esteIdNoExiste').expect(404));
  });

  describe('GET /temperament', () => {
    it('Deberia responder con status 200', () => agent.get('/temperament').expect(200));
  });

  describe('POST /dog', () => {
    it('Deberia responder con status 200 cuando recibe una nueva raza para guardar', () => agent.post('/dog')
    .send({ 
      name: 'Pug', 
      min_height: 10, 
      max_height: 15, 
      min_weight: 3, 
      max_weight: 5, 
      min_life_span: 7,
      max_life_span: 12,
      image: 'data://vkjdsnku532uh32lkh4132vb5j3215jhb23jh5b213',
      temperaments: ['2', '5', '8'] }).expect(200));

    it('Deberia responder con status 404 si falta un campo requerido', () => agent.post('/dog')
    .send({
      name: 'Sam',
      min_height: 25, 
      max_height: 30, 
      min_life_span: 15,
      max_life_span: 20 }).expect(404));
  });
});
