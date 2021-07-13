import express from 'express';
import cacheMiddleware from '../utilities/cacheUtilities';
import imageUtitlities from '../utilities/imageUtitlities';

const routes = express.Router();

routes.use((req, res, next) => {
  console.log('Method:', req.method);
  console.log('Query:', req.query);
  next();
});

routes.get('/', (req, res) => {
  console.log(Object.values(imageUtitlities.ImgSizes as object));
  res.render('index', {
    images: Object.entries(imageUtitlities.ImgNames)
      .filter(item => item[0] != 'TEST')
      .map(item => ({
        key: item[0].toLowerCase().split('_').join(' '),
        value: item[1],
      })),
    widths: Object.entries(imageUtitlities.ImgSizes)
      .filter(item => item[0] != 'FULL_HEIGHT')
      .map(item => ({
        key:
          item[0] === 'FULL_WIDTH'
            ? item[0].toLowerCase().split('_').join(' ')
            : item[1],
        value: item[1],
      })),
    heights: Object.entries(imageUtitlities.ImgSizes)
      .filter(item => item[0] != 'FULL_WIDTH')
      .map(item => ({
        key:
          item[0] === 'FULL_HEIGHT'
            ? item[0].toLowerCase().split('_').join(' ')
            : item[1],
        value: item[1],
      })),
    formats: Object.values(imageUtitlities.ImgFormats),
  });
});

routes.get('/images/', cacheMiddleware(300), async (req, res) => {
  const { image, format } = req.query;
  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);
  const imgThumb = await imageUtitlities.createImgThumb(
    image as string,
    width as number,
    height as number,
    format as string
  );

  res.send({
    image: imgThumb,
  });
});

export default routes;
