import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';
import {StaticRouter} from 'react-router';
import {matchRoutes} from 'react-router-config';

import {App} from '../../client/route/index';
import {routeConfig} from '../../client/route/route.config';

const fs = require('fs');
const cheerio = require('cheerio');

export default async (req,res,next)=>{
    const {path,url} = req;

    if(url.indexOf('.') > -1){
        return next();
    };

    const branch = matchRoutes(routeConfig,path)[0];
    let component = {};
    if(branch){
        component = branch.route.component
    }

    let initialData = "sss3";

    if(component.preFetch){
        initialData = await component.preFetch();
    };

    const context = {
        initialData
    };

    const reactStr = renderToString(
        <StaticRouter location={path} context={context}>
          <App />
        </StaticRouter>
      );
      
      const $ = cheerio.load(fs.readFileSync('./index.html').toString());
      $('#root').html(reactStr);
      $('body').append(`<input id="curcompvalue" value="${typeof initialData == 'object' ? JSON.stringify(initialData):initialData}" />`);
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