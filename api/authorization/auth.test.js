/**
 * Dependencies
 */
const request = require('supertest');

/**
 * Resources
 */
const { prepareDatabase } = require('../user/user.seed');

/**
 * Express App
 */
const { app } = require('../../app');

/**
 * Start Tests
 */
describe('Authorization', () => {
  beforeAll(prepareDatabase);

  it('should save a new user and return saved user with token', async (done) => {
    request(app)
      .post('/api/singup')
      .send({
        nome: 'Daniel',
        email: 'daniel@email.com',
        senha: '123456',
        telefones: [{ numero: '99308-0281', ddd: 61 }, { numero: '99308-0282', ddd: 61 }],
      })
      .expect(201)
      .expect(({ body }) => {
        expect.objectContaining({
          _id: expect(typeof body._id).toBe('string'),
          nome: expect(body.nome).toBe('Daniel'),
          email: expect(body.email).toBe('daniel@email.com'),
          token: expect(typeof body.token).toBe('string'),
        });
      })
      .end(done);
  });

  it('should not save a new user and return a required field error message', async (done) => {
    request(app)
      .post('/api/singup')
      .send({
        email: 'diego_1@email.com',
        senha: '123456',
        telefones: [{ numero: '99308-0281', ddd: 61 }, { numero: '99308-0282', ddd: 61 }],
      })
      .expect(422)
      .expect(({ text }) => {
        expect(text).toBe('Path `nome` is required.');
      })
      .end(done);
  });

  it('should not save a new user and return a email already exist error message', async (done) => {
    request(app)
      .post('/api/singup')
      .send({
        nome: 'Diego',
        email: 'daniel@email.com',
        senha: '123456',
        telefones: [{ numero: '99308-0281', ddd: 61 }, { numero: '99308-0282', ddd: 61 }],
      })
      .expect(409)
      .expect(({ text }) => {
        expect(text).toBe('E-mail já existente.');
      })
      .end(done);
  });

  it('should not save a new user and return a required field "senha" error message', async (done) => {
    request(app)
      .post('/api/singup')
      .send({
        nome: 'Diego',
        email: 'diego_2@email.com',
        telefones: [{ numero: '99308-0281', ddd: 61 }, { numero: '99308-0282', ddd: 61 }],
      })
      .expect(422)
      .expect(({ text }) => {
        expect(text).toBe('Path `senha` is required.');
      })
      .end(done);
  });

  it('should sign in successfully', async (done) => {
    request(app)
      .post('/api/signin')
      .send({
        email: 'daniel@email.com',
        senha: '123456',
      })
      .expect(200)
      .expect(({ body }) => {
        expect.objectContaining({
          _id: expect(typeof body._id).toBe('string'),
          nome: expect(body.nome).toBe('Daniel'),
          token: expect(typeof body.token).toBe('string'),
          data_atualizacao: expect(typeof body.token).toBe('string'),
        });
      })
      .end(done);
  });
});
