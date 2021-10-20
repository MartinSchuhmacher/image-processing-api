import path from 'path';
import imageHelper from '../../helpers/imageResize';

const fullImagePath = path.resolve(__dirname, '../../../assets/full/fox.jpg');
const thumbnailImagePath = path.resolve(__dirname, '../../../assets/thumbnail/fox.jpg');

describe('imageResize function', (): void => {
   it('returns a buffer after successfully resizing the image', async () => {
      const imageBuffer: Buffer = await imageHelper.resizeImage({
         fullImagePath,
         thumbnailImagePath,
         width: 200,
         height: 100,
      });
      expect(imageBuffer).toBeInstanceOf(Buffer);
   });

   it('rejects promise if something went wrong during processing', async (): Promise<void> => {
      await expectAsync(
         imageHelper.resizeImage({
            fullImagePath: '',
            thumbnailImagePath,
            width: 200,
            height: 100,
         }),
      ).toBeRejected();
   });
});
