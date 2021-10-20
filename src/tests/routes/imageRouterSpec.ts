import request from 'supertest';
import fs from 'fs/promises';
import path from 'path';
import sizeOf from 'image-size';
import app from '../../index';
import { Stats } from 'fs';

describe('GET /api/image', () => {
   it('responds with status 400 if called without any parameters', (result): void => {
      request(app).get('/api/image').expect(400, result);
   });

   it('responds with status 400 if called with at least one missing parameter', (result): void => {
      request(app).get('/api/image?filename=test&height=100').expect(400, result);
   });

   it('responds with 404 if requested correctly but image does not exist', (result): void => {
      request(app).get('/api/image?filename=test&height=100&width=100').expect(404, result);
   });

   it('created a thumbnail version of an image', (result): void => {
      request(app)
         .get('/api/image?filename=fox&height=100&width=100')
         .then(() => {
            fs.stat(path.resolve(__dirname, '../../../assets/thumbnail/fox-100x100.jpg')).then((fileStat: Stats) =>
               expect(fileStat).not.toBeNull(),
            );
            result();
         });
   });

   it('created a thumb version of the image with the correct height and width', (result): void => {
      request(app)
         .get('/api/image?filename=fox&height=100&width=150')
         .then(() => {
            const dimensions = sizeOf(path.resolve(__dirname, '../../../assets/thumbnail/fox-100x150.jpg'));
            expect(dimensions.height).toEqual(100);
            expect(dimensions.width).toEqual(150);
            result();
         });
   });
});
