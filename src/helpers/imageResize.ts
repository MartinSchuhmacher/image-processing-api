import fs from 'fs/promises';
import sharp from 'sharp';

interface ResizeImageProps {
   fullImagePath: string;
   thumbnailImagePath: string;
   width: number;
   height: number;
}

/* resize a given fullImage from the path and save as a thumbnail to the given thumbnailImagePath
additionally returns buffer of resized image if succeeded */

const resizeImage = async ({ fullImagePath, thumbnailImagePath, width, height }: ResizeImageProps): Promise<Buffer> => {
   const data: Buffer | null = await fs.readFile(fullImagePath).catch(() => null);

   // exit if no image found
   if (!data) {
      return Promise.reject();
   }

   const imageBuffer: Buffer | null = await sharp(data)
      .resize(width, height)
      .toBuffer()
      .catch(() => null);

   // exit if resize to Buffer has failed
   if (!imageBuffer) {
      return Promise.reject();
   }

   // write resized image to thumbnailImagePath and return imageBuffer or exit if error during process
   return fs
      .writeFile(thumbnailImagePath, imageBuffer)
      .then(() => imageBuffer)
      .catch(() => Promise.reject());
};

export default { resizeImage };
