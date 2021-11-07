import express from 'express';
import { cacheMiddleware, ImgNames, ImgSizes, ImgFormats } from '../utilities';

const routes = express.Router();

// routes.use((req, _res, next) => {
//   console.log('Method:', req.method); // eslint-disable-line no-console
//   console.log('Query:', req.query); // eslint-disable-line no-console
//   next();
// });

routes.get('/', (_req, res) => {
  res.render('index', {
    images: Object.entries(ImgNames)
      .filter(item => item[0] !== 'TEST')
      .map(item => ({
        key: item[0].toLowerCase().split('_').join(' '),
        value: item[1],
      })),
    widths: Object.entries(ImgSizes)
      .filter(item => item[0] !== 'FULL_HEIGHT')
      .map(item => ({
        key:
          item[0] === 'FULL_WIDTH'
            ? item[0].toLowerCase().split('_').join(' ')
            : item[1],
        value: item[1],
      })),
    heights: Object.entries(ImgSizes)
      .filter(item => item[0] !== 'FULL_WIDTH')
      .map(item => ({
        key:
          item[0] === 'FULL_HEIGHT'
            ? item[0].toLowerCase().split('_').join(' ')
            : item[1],
        value: item[1],
      })),
    formats: Object.values(ImgFormats),
  });
});

routes.get('/images/', cacheMiddleware(300));

export default routes;
