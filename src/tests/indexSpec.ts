import request from 'supertest';
import app from '../index';

describe('GET / should', (): void => {
   it('respond with status 200', (result): void => {
      request(app).get('/').expect(200, result);
   });
});
