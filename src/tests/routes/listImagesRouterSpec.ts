import request from 'supertest';
import app from '../../index';

describe('GET /api/listImages', (): void => {
   it('responds with 200', (result): void => {
      request(app).get('/api/listImages').expect(200, result);
   });
});
