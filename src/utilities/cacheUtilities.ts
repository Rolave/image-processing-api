import { Request, Response, NextFunction } from 'express';
import nodeCache from 'node-cache';
import imageUtitlities from './imageUtitlities';

const cache = new nodeCache();
const cacheMiddleware =
  (duration: number) => (req: Request, res: Response, next: NextFunction) => {
    const { image, width, height, format } = req.query;
    const key = imageUtitlities.getImgFileName(
      image as string,
      parseInt(width as string),
      parseInt(height as string),
      format as string
    );
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
      res.send({ image: cachedResponse });
    } else {
      cache.set(key, key, duration);
      next();
    }
  };

export default cacheMiddleware;
