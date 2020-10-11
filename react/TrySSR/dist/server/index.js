/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/client/pages/Drink/index.js":
/*!*****************************************!*\
  !*** ./src/client/pages/Drink/index.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\n  var cb = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useCallback\"])(function () {\n    console.log(3);\n  }, []);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    onClick: cb\n  }, \"i am Drink!\");\n});\n\n//# sourceURL=webpack:///./src/client/pages/Drink/index.js?");

/***/ }),

/***/ "./src/client/pages/Fruit/index.js":
/*!*****************************************!*\
  !*** ./src/client/pages/Fruit/index.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\n  var cb = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useCallback\"])(function () {\n    console.log(1);\n  }, []);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    onClick: cb\n  }, \"i am fruit!\");\n});\n\n//# sourceURL=webpack:///./src/client/pages/Fruit/index.js?");

/***/ }),

/***/ "./src/client/pages/Meet/index.js":
/*!****************************************!*\
  !*** ./src/client/pages/Meet/index.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\n  var cb = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useCallback\"])(function () {\n    console.log(2);\n  }, []);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    onClick: cb\n  }, \"i am Meet!\");\n});\n\n//# sourceURL=webpack:///./src/client/pages/Meet/index.js?");

/***/ }),

/***/ "./src/client/route/header.js":
/*!************************************!*\
  !*** ./src/client/route/header.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _route_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./route.config */ \"./src/client/route/route.config.js\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, _route_config__WEBPACK_IMPORTED_MODULE_2__[\"routeConfig\"].map(function (v) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"], {\n      key: v.path,\n      to: v.path\n    }, v.name);\n  }));\n});\n\n//# sourceURL=webpack:///./src/client/route/header.js?");

/***/ }),

/***/ "./src/client/route/index.js":
/*!***********************************!*\
  !*** ./src/client/route/index.js ***!
  \***********************************/
/*! exports provided: App */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"App\", function() { return App; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _route_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./route.config */ \"./src/client/route/route.config.js\");\n/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./header */ \"./src/client/route/header.js\");\n\n\n\n\nvar App = function App() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__[\"Fragment\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_header__WEBPACK_IMPORTED_MODULE_3__[\"default\"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Switch\"], null, _route_config__WEBPACK_IMPORTED_MODULE_2__[\"routeConfig\"].map(function (v) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Route\"], v);\n  })));\n};\n\n//# sourceURL=webpack:///./src/client/route/index.js?");

/***/ }),

/***/ "./src/client/route/route.config.js":
/*!******************************************!*\
  !*** ./src/client/route/route.config.js ***!
  \******************************************/
/*! exports provided: routeConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"routeConfig\", function() { return routeConfig; });\n/* harmony import */ var _pages_Fruit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pages/Fruit */ \"./src/client/pages/Fruit/index.js\");\n/* harmony import */ var _pages_Meet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../pages/Meet */ \"./src/client/pages/Meet/index.js\");\n/* harmony import */ var _pages_Drink__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../pages/Drink */ \"./src/client/pages/Drink/index.js\");\n\n\n\nvar routeConfig = [{\n  name: \"Fruit\",\n  path: '/Fruit',\n  key: 'Fruit',\n  exact: true,\n  component: _pages_Fruit__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n}, {\n  name: \"Meet\",\n  path: '/Meet',\n  key: 'Meet',\n  exact: true,\n  component: _pages_Meet__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n}, {\n  name: \"Drink\",\n  path: '/Drink',\n  key: 'Drink',\n  exact: true,\n  component: _pages_Drink__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\n}];\n\n//# sourceURL=webpack:///./src/client/route/route.config.js?");

/***/ }),

/***/ "./src/server/index.js":
/*!*****************************!*\
  !*** ./src/server/index.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _middleWare_ssr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./middleWare/ssr */ \"./src/server/middleWare/ssr.js\");\n\n\nvar app = express__WEBPACK_IMPORTED_MODULE_0___default()();\napp.use(express__WEBPACK_IMPORTED_MODULE_0___default.a[\"static\"]('./dist/client'));\napp.use(_middleWare_ssr__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\napp.listen(9999, function () {\n  return console.log('node listen 9999');\n});\n\n//# sourceURL=webpack:///./src/server/index.js?");

/***/ }),

/***/ "./src/server/middleWare/ssr.js":
/*!**************************************!*\
  !*** ./src/server/middleWare/ssr.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-dom/server */ \"react-dom/server\");\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router */ \"react-router\");\n/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _client_route_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../client/route/index */ \"./src/client/route/index.js\");\n\n\n\n\n\nvar fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar cheerio = __webpack_require__(/*! cheerio */ \"cheerio\");\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (req, res, next) {\n  var path = req.path,\n      url = req.url;\n\n  if (url.indexOf('.') > -1) {\n    return next();\n  }\n\n  ;\n  var reactStr = Object(react_dom_server__WEBPACK_IMPORTED_MODULE_0__[\"renderToString\"])( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_2__[\"StaticRouter\"], {\n    location: path\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_client_route_index__WEBPACK_IMPORTED_MODULE_3__[\"App\"], null)));\n  var $ = cheerio.load(fs.readFileSync('./index.html').toString());\n  $('#root').html(reactStr);\n  $('body').append('<script type=\"text/javascript\" src=\"/index.js\"></script></body>'); // html = html.replace(`<div id=\"root\"></div>`,`<div id=\"root\">${reactStr}</div>`);\n  // html = html.replace(`</body>`,`<script type=\"text/javascript\" src=\"/index.js\"></script></body>`);\n  // 原理就是拼接字符串\n  // const html = `<!DOCTYPE html>\n  // <html lang=\"en\">\n  // <head>\n  //     <meta charset=\"UTF-8\">\n  //     <title></title>\n  // </head>\n  // <body>\n  //     <div id=\"root\">${reactStr}</div>\n  //     <script type=\"text/javascript\" src=\"/index.js\"></script>\n  // </body>\n  // </html>`;\n\n  res.send($.html());\n  return next();\n});\n\n//# sourceURL=webpack:///./src/server/middleWare/ssr.js?");

/***/ }),

/***/ "cheerio":
/*!**************************!*\
  !*** external "cheerio" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cheerio\");\n\n//# sourceURL=webpack:///external_%22cheerio%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");\n\n//# sourceURL=webpack:///external_%22react%22?");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-dom/server\");\n\n//# sourceURL=webpack:///external_%22react-dom/server%22?");

/***/ }),

/***/ "react-router":
/*!*******************************!*\
  !*** external "react-router" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-router\");\n\n//# sourceURL=webpack:///external_%22react-router%22?");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-router-dom\");\n\n//# sourceURL=webpack:///external_%22react-router-dom%22?");

/***/ })

/******/ });