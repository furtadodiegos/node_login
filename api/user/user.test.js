/* eslint no-underscore-dangle: 0 */
/**
 * Dependencies
 */
const request = require('supertest');

/**
 * Resources
 */
const { User } = require('./user.model');
const { prepareDatabase } = require('./user.seed');

/**
 * Express App
 */
const { app } = require('../../app');

/**
 * Start Tests
 */
describe('Users', () => {
  beforeAll(prepareDatabase);

  it('should get an user', async (done) => {
    request(app)
      .post('/api/singup')
      .send({
        nome: 'Diego',
        email: 'diego@email.com',
        senha: '123456',
        telefones: [{ numero: '99308-0281', ddd: 61 }, { numero: '99308-0282', ddd: 61 }],
      })
      .expect(200)
      .end(async () => {
        const user = await User.find({}).limit();

        request(app)
          .get(`/api/users/${user[0]._id}`)
          .set('Authorization', `Bearer ${user[0].token}`)
          .expect(200)
          .expect(({ body }) => {
            expect.objectContaining({
              _id: expect(typeof body._id).toBe('string'),
              nome: expect(body.nome).toBe('Diego'),
              token: expect(typeof body.token).toBe('string'),
            });
          })
          .end(done);
      });
  });

  // Test with wrong header -> Token instead Authorization
  it('should return a unauthorize error message', async (done) => {
    const user = await User.find({}).limit(1);

    request(app)
      .get(`/api/users/${user[0]._id}`)
      .set('token', `Bearer ${user[0].token}`)
      .expect(401)
      .expect(({ text }) => {
        expect(text).toBe('Não autorizado');
      })
      .end(done);
  });

  // Test with wrong header -> No Bearer on Authorization
  it('should return a unauthorize error message', async (done) => {
    const user = await User.find({}).limit(1);

    request(app)
      .get(`/api/users/${user[0]._id}`)
      .set('Authorization', `${user[0].token}`)
      .expect(401)
      .expect(({ text }) => {
        expect(text).toBe('Não autorizado');
      })
      .end(done);
  });

  // Test with wrong token
  it('should return a unauthorize error message', async (done) => {
    const user = await User.find({}).limit(1);

    request(app)
      .get(`/api/users/${user[0]._id}`)
      .set('Authorization', 'teste')
      .expect(401)
      .expect(({ text }) => {
        expect(text).toBe('Não autorizado');
      })
      .end(done);
  });
});
