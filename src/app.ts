import express from 'express';
import path from 'path';
import routes from './routes/index';

const app = express();
const viewsPath = path.join(__dirname, '../views');
const publicDirPath = path.join(__dirname, '../public');

app.set('view engine', 'html');
app.set('view engine', 'ejs');
app.set('views', viewsPath);
app.use(express.static(publicDirPath));

app.use('', routes);

app.use((_req, res) => {
  res.status(404).render('404', {
    title: 'Error 404',
    description: 'The content you where looking for does not exist.',
  });
});

export default app;
