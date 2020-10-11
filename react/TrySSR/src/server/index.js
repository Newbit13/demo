import express from 'express';

import ssr from './middleWare/ssr';

const app = express();

app.use(express.static('./dist/client'));

app.use(ssr);

app.listen(9999, () => console.log('node listen 9999'));