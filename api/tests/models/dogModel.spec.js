const { Dog, conn } = require('../../src/db.js');

describe('Modelo Dog', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('No es posible conectar a la base de datos:', err);
    }));
  describe('Validadores de atributos', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('Requiere id, name, weight, height', () => {
      it('Deberia arrojar un error si no se le pasa id, nombre(name), peso(weight) y altura(height) que son obligatorios', (done) => {
        Dog.create({life_span: '10 - 15', image: 'someImageBase64Data'})
          .then(() => done(new Error('Los atributos name, weight y height obligatorios')))
          .catch(() => done());
      });
      it('Deberia funcionar si se envian id, name, height y weight', (done) => {
        Dog.create({ id: 'some10char', name: 'Pug', height: '10 - 12', weight: '5 - 6' })
        .then(() => done());
      });
      it('Deberia arrojar un error si no se pasa el tipo de dato correcto id(STRING(10))', (done) => {
        Dog.create({ id: 5, name: 'Pug', height: '10 - 12', weight: '5 - 6' })
          .then(() => done(new Error('El tipo de dato id es incorrecto y o su largo no es es menor o mayor que 10')))
          .catch(() => done());
      }); 
      it('Deberia arrojar un error si no se pasa el tipo de dato correcto name(STRING)', (done) => {
        Dog.create({ id: 'qwerty1234', name: 65, height: '10 - 12', weight: '5 - 6' })
          .then(() => done(new Error('El tipo de dato name es incorrecto')))
          .catch(() => done());
      }); 
      it('Deberia arrojar un error si no se pasa el dato correctamente height(STRING) "20 - 35"', (done) => {
        Dog.create({ id: 'qwerty1234', name: 'Sam', height: 33, weight: '8 - 10' })
          .then(() => done(new Error('El formato de height es incorrecto')))
          .catch(() => done());
      }); 
      it('Deberia arrojar un error si no se pasa el dato correctamente weight(STRING) "2 - 5"', (done) => {
        Dog.create({ id: 'qwerty1234', name: 'Sam', height: '25 - 30', weight: 10 })
          .then(() => done(new Error('El tipo de dato weight es incorrecto')))
          .catch(() => done());
      });
    });
  });
});
