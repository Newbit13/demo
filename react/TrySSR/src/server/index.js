import { renderToString } from 'react-dom/server';
import React from 'react';
import express from 'express';

import Fruit from '../client/pages/Fruit'

const fs = require('fs');

const app = express();

app.use(express.static('./dist/client'));
// app.use(ssr);

app.get('/', (req, res) => {
  const reactStr = renderToString(<Fruit />);
  
  let html = fs.readFileSync('./index.html').toString();
  html = html.replace(`<div id="root"></div>`,`<div id="root">${reactStr}</div>`);
  html = html.replace(`</body>`,`<script type="text/javascript" src="/index.js"></script></body>`);
  // const html = `<!DOCTYPE html>
  // <html lang="en">
  // <head>
  //     <meta charset="UTF-8">
  //     <title></title>
  // </head>
  // <body>
  //     <div id="root">${reactStr}</div>
  //     <script type="text/javascript" src="/index.js"></script>
  // </body>
  // </html>`;

  return res.send(html);
});

app.listen(9999, () => console.log('node listen 9999'));