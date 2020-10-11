import { renderToString } from 'react-dom/server';

import React from 'react';

import {StaticRouter} from 'react-router'

import {App} from '../../client/route/index'

const fs = require('fs');
const cheerio = require('cheerio');

export default (req,res,next)=>{
    const {path,url} = req;

    if(url.indexOf('.') > -1){
        return next();
    };

    const reactStr = renderToString(
        <StaticRouter location={path}>
          <App />
        </StaticRouter>
      );
      
      const $ = cheerio.load(fs.readFileSync('./index.html').toString());
      $('#root').html(reactStr);
      $('body').append('<script type="text/javascript" src="/index.js"></script></body>');
      // html = html.replace(`<div id="root"></div>`,`<div id="root">${reactStr}</div>`);
      // html = html.replace(`</body>`,`<script type="text/javascript" src="/index.js"></script></body>`);
    
      // 原理就是拼接字符串
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
    
      res.send($.html());

      return next();
}