"use strict";

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
/**
 * 引入fiber，通过performUnitOfWork来创建fiber并创建dom，并渲染dom
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
  nextUnitOfWork = {
    dom: container,
    props: {
      children: [element]
    }
  };
}
function createDom(fiber) {
  var dom = fiber.type == "TEXT_ELEMENT" ? document.createTextNode("") : document.createElement(fiber.type);
  var isProperty = function isProperty(key) {
    return key !== "children";
  };
  Object.keys(fiber.props).filter(isProperty).forEach(function (name) {
    dom[name] = fiber.props[name];
  });
  return dom;
}
var nextUnitOfWork = null;
function workLoop(deadline) {
  var shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }
  requestIdleCallback(workLoop);
}
requestIdleCallback(workLoop);
function performUnitOfWork(fiber) {
  // add dom node
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  // 这一步会导致在执行过程中看到不完整的ui
  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom);
  }
  // create new fibers
  var elements = fiber.props.children;
  var index = 0;
  var prevSibling = null;
  while (index < elements.length) {
    var _element = elements[index];
    var newFiber = {
      type: _element.type,
      props: _element.props,
      parent: fiber,
      dom: null
    };
    if (index == 0) {
      fiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }
    prevSibling = newFiber;
    index++;
  }
  // return next unit of work
  if (fiber.child) {
    return fiber.child;
  }
  var nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
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
}, Didact.createElement("div", null, Didact.createElement("p", null, "1"), Didact.createElement("div", null, Didact.createElement("div", null, Didact.createElement("p", null, "1"), Didact.createElement("div", null, Didact.createElement("div", null, Didact.createElement("p", null, "1"), Didact.createElement("div", null)), Didact.createElement("div", null, Didact.createElement("p", null, "2"), Didact.createElement("div", null)), Didact.createElement("div", null, Didact.createElement("p", null, "3"), Didact.createElement("div", null)), Didact.createElement("div", null, Didact.createElement("p", null, "4"), Didact.createElement("div", null)), Didact.createElement("div", null, Didact.createElement("p", null, "5"), Didact.createElement("div", null)))), Didact.createElement("div", null, Didact.createElement("p", null, "2"), Didact.createElement("div", null)), Didact.createElement("div", null, Didact.createElement("p", null, "3"), Didact.createElement("div", null)), Didact.createElement("div", null, Didact.createElement("p", null, "4"), Didact.createElement("div", null)), Didact.createElement("div", null, Didact.createElement("p", null, "5"), Didact.createElement("div", null)))), Didact.createElement("div", null, Didact.createElement("p", null, "2"), Didact.createElement("div", null)), Didact.createElement("div", null, Didact.createElement("p", null, "3"), Didact.createElement("div", null)), Didact.createElement("div", null, Didact.createElement("p", null, "4"), Didact.createElement("div", null)), Didact.createElement("div", null, Didact.createElement("p", null, "5"), Didact.createElement("div", null)));
var container = document.getElementById("root");
Didact.render(element, container);