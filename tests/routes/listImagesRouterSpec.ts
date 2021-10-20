import request from 'supertest';
import app from '../../src/index';

describe('GET /api/listImages', (): void => {
   it('responds with 200', (): void => {
      request(app).get('/api/listImages').expect(200);
   });
});
