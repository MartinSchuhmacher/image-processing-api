import express, { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';

const listImagesRouter = express.Router();

// show all available images for resizing
listImagesRouter.get('/', async (_req: Request, res: Response): Promise<void> => {
   const folderPathFullImages = `${path.resolve(__dirname, '../../../assets/full')}`;

   // check if images are present
   const files: string[] | null = await fs.readdir(folderPathFullImages).catch(() => {
      res.status(500).send('Error while fetching images');
      return null;
   });

   // ..and exit if there is any error while fetching them
   if (!files) {
      return;
   }

   let htmlResponse = `
    <h1>Available Images</h1>
    <p>Here is a list of available images on the route /api/images</p>
    <ul>
   `;

   // add each found file to a list in the htmlResponse
   files.forEach((file: string): void => {
      htmlResponse = htmlResponse + `<li>${file}</li>`;
   });

   res.status(200).send(`${htmlResponse}</ul>`);
});

export default listImagesRouter;
