import express from 'express';

import routes from './routes';

const app = express();

app.use(routes);

app.listen(process.env.SERVER_PORT, () => {
    console.log('Up');
});
