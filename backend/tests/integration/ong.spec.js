const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection')


describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });
  it('should gbe able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: "I.A.N.S.A",
        email: "lucas.dcorrea1@gmail.com",
        whatsapp: '1111111111',
        city: "Franca",
        uf: "SP"
      });

      expect(response.body).toHaveProperty('id');
      expect(response.body.id).toHaveLength(8);
  });
});