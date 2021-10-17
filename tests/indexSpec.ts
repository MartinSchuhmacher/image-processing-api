import request from 'supertest';
import app from '../src/index';

describe('GET / should', (): void => {
   it('respond with status 200', (): void => {
      request(app).get('/').expect(200);
   });
});
