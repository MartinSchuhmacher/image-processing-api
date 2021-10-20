import express, { Response } from 'express';
import fs from 'fs';
import path from 'path';
import routes from './routes/index';

const app = express();
const port = 8081;

app.use('/api', routes);

app.get('/', (_, res: Response): void => {
   res.status(200).send('server is working fine!');
});

app.listen(port, (): void => {
   // check for thumbnail folder
   const thumbnailPath: string = path.resolve(__dirname, '../assets/thumbnail');

   // create synchronous if not existent
   if (!fs.existsSync(thumbnailPath)) {
      fs.mkdirSync(thumbnailPath);
   }

   console.log(`Server running smoothly on port ${port}!`);
});

export default app;
