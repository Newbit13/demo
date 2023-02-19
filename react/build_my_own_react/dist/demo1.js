"use strict";

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
/**
 * 自定义createElement、render
*/
function createElement(type, props) {
  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }
  return {
    type: type,
    props: _extends({}, props, {
      children: children.map(function (child) {
        return typeof child === "object" ? child : createTextElement(child);
      })
    })
  };
}
function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: []
    }
  };
}
function render(element, container) {
  var dom = element.type == "TEXT_ELEMENT" ? document.createTextNode("") : document.createElement(element.type);
  var isProperty = function isProperty(key) {
    return key !== "children";
  };
  Object.keys(element.props).filter(isProperty).forEach(function (name) {
    dom[name] = element.props[name];
  });
  element.props.children.forEach(function (child) {
    render(child, dom);
  });
  container.appendChild(dom);
}
var Didact = {
  createElement: createElement,
  render: render
};

// const element = (
//   /** @jsx Didact.createElement */
//   <div id="foo">
//     <a>bar</a>
//     <b />
//   </div>
// );
var element = Didact.createElement("div", {
  id: "foo"
}, Didact.createElement("a", null, "bar"), Didact.createElement("b", null));
var container = document.getElementById("root");
Didact.render(element, container);