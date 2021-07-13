import supertest from 'supertest';
import app from '../app';

const request = supertest(app);

describe('Test api endpoint responses', () => {
  it('should returns status code 200 when gets the api endpoint', async () => {
    const response = await request.get('/');

    expect(response.status).toBe(200);
  });
});
