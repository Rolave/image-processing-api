import app from './app';
import chalk from 'chalk';
import routes from './routes/index';

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`App listening at ${chalk.green('http://localhost:' + port)}`);
});
