import { renderToString } from 'react-dom/server';
import express from 'express';

import {Fruit} from '../client/pages/Fruit'

const app = express();

app.get('*', (req, res) => {
  const reactStr = renderToString(<Fruit />);

  const html = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title></title>
  </head>
  <body>
      <div id="root">${reactStr}</div>
  </body>
  </html>`;

  return res.send(html);
});