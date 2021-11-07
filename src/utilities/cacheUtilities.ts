import { Request, Response } from 'express';
import nodeCache from 'node-cache';
import { getImgFileName, createImgThumb } from '.';

const cache = new nodeCache();
const getkeyName = (
  image: string,
  width: string,
  height: string,
  format: string
) => getImgFileName(image, parseInt(width), parseInt(height), format);

export const cacheMiddleware =
  (duration: number) =>
  // eslint-disable-next-line
  async (req: Request, res: Response) => {
    const { image, width, height, format } = req.query;
    const key = getkeyName(
      image as string,
      width as string,
      height as string,
      format as string
    );
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
      res.status(200).send(cachedResponse);
    } else {
      const imageWidth = parseInt(width as string);
      const imageHeight = parseInt(height as string);
      const imageResponse = await createImgThumb(
        image as string,
        imageWidth as number,
        imageHeight as number,
        format as string
      );
      cache.set(key, imageResponse, duration);
      res.status(200).send(imageResponse);
    }
  };
