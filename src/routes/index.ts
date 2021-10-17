import express from 'express';
import imageRouter from './api/imageRouter';
import listImagesRouter from './api/listImagesRouter';

const routes = express.Router();

routes.use('/image', imageRouter);
routes.use('/listImages', listImagesRouter);

export default routes;
