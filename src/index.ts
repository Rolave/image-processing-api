import app from './app';
import chalk from 'chalk';

const port = process.env.port || 3000;

app.listen(port, () => {
  /* eslint-disable-next-line no-console */
  console.log(`App listening at ${chalk.green('http://localhost:' + port)}`);
});
