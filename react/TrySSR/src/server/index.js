import express from 'express';

import ssr from './middleWare/ssr';
import router from './router'

const app = express();

app.use(express.static('./dist/client'));

app.use('/',router);//app.use(router);

app.use(ssr);

app.listen(9999, () => console.log('node listen 9999'));