import express from 'express';
import bodyParser from 'body-parser';

import routes from './routes';

const app = express();

app.use(bodyParser());

app.use(routes);

app.listen(process.env.SERVER_PORT, () => {
    console.log('Up');
});
