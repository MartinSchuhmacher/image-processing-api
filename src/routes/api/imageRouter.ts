import express, { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { Stats } from 'fs';
import resizeImageHelper from '../../helpers/imageResize';

const imageRouter = express.Router();

imageRouter.get('/', async (req: Request, res: Response): Promise<void> => {
   const fileName = req.query['filename'];
   const height = req.query['height'] ? parseInt(req.query['height'] as string, 10) : null;
   const width = req.query['width'] ? parseInt(req.query['width'] as string, 10) : null;

   //check for correct query syntax with above results
   if (!fileName || !height || !width) {
      res.status(400).send('Please place a correct url with the necessary filename, height and width parameters');
   }

   // fetch path to full image for fileName
   const fullImagePath = `${path.resolve(__dirname, `../../../assets/full/${fileName}.jpg`)}`;

   // fetch path to thumbnail image for fileName in ${filename}-${height}x${width} format
   const thumbnailImagePath = `${path.resolve(
      __dirname,
      `../../../full/thumbnail/${fileName}-${height}x${width}.jpg`,
   )}`;

   // check if fullimage exists for requested fileName
   const fullImage: Stats | null = await fs.stat(fullImagePath).catch(() => {
      res.status(404).send('requested image does not exist, please try another one');
      return null;
   });
   // ..and exit if it does not exist
   if (!fullImage) {
      return;
   }

   // check if the requested thumbnail already exists
   const existingThumbnail: Stats | null = await fs.stat(thumbnailImagePath).catch(() => {
      return null;
   });
   if (existingThumbnail) {
      fs.readFile(thumbnailImagePath)
         .then((thumbnailData: Buffer) => {
            res.status(200).contentType('jpg').send(thumbnailData);
         })
         .catch(() => {
            res.status(500).send('error while fetching the existing thumbnail');
         });
   } else {
      // resize the requested image
      resizeImageHelper
         .resizeImage({ fullImagePath, thumbnailImagePath, width, height })
         .then((resizedImage: Buffer) => res.status(200).contentType('jpg').send(resizedImage))
         .catch(() => {
            res.status(500).send('something went wrong during resizing the requested image');
         });
   }
});

export default imageRouter;
