"use strict";

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
var isEvent = function isEvent(key) {
  return key.startsWith("on");
};
var isProperty = function isProperty(key) {
  return key !== "children" && !isEvent(key);
};
var isNew = function isNew(prev, next) {
  return function (key) {
    return prev[key] !== next[key];
  };
};
var isGone = function isGone(prev, next) {
  return function (key) {
    return !(key in next);
  };
};
function updateDom(dom, prevProps, nextProps) {
  //Remove old or changed event listeners
  Object.keys(prevProps).filter(isEvent).filter(function (key) {
    return !(key in nextProps) || isNew(prevProps, nextProps)(key);
  }).forEach(function (name) {
    var eventType = name.toLowerCase().substring(2);
    dom.removeEventListener(eventType, prevProps[name]);
  });

  // Remove old properties
  Object.keys(prevProps).filter(isProperty).filter(isGone(prevProps, nextProps)).forEach(function (name) {
    dom[name] = "";
  });

  // Set new or changed properties
  Object.keys(nextProps).filter(isProperty).filter(isNew(prevProps, nextProps)).forEach(function (name) {
    dom[name] = nextProps[name];
  });

  // Add event listeners
  Object.keys(nextProps).filter(isEvent).filter(isNew(prevProps, nextProps)).forEach(function (name) {
    var eventType = name.toLowerCase().substring(2);
    dom.addEventListener(eventType, nextProps[name]);
  });
}
function commitRoot() {
  deletions.forEach(commitWork);
  commitWork(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
}
function commitWork(fiber) {
  if (!fiber) {
    return;
  }

  // const domParent = fiber.parent.dom;
  var domParentFiber = fiber.parent;
  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent;
  }
  var domParent = domParentFiber.dom;
  if (fiber.effectTag === "PLACEMENT" && fiber.dom != null) {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === "UPDATE" && fiber.dom != null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  } else if (fiber.effectTag === "DELETION") {
    commitDeletion(fiber, domParent);
    return;
  }
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}
function commitDeletion(fiber, domParent) {
  if (fiber.dom) {
    domParent.removeChild(fiber.dom);
  } else {
    commitDeletion(fiber.child, domParent);
  }
}
function render(element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element]
    },
    alternate: currentRoot
  };
  deletions = [];
  nextUnitOfWork = wipRoot;
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
var currentRoot = null;
var wipRoot = null;
var deletions = null;
function workLoop(deadline) {
  var shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }
  requestIdleCallback(workLoop);
}
requestIdleCallback(workLoop);
function performUnitOfWork(fiber) {
  // add dom node
  var isFunctionComponent = fiber.type instanceof Function;
  if (isFunctionComponent) {
    updateFunctionComponent(fiber);
  } else {
    updateHostComponent(fiber);
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
var wipFiber = null;
var hookIndex = null;
function updateFunctionComponent(fiber) {
  wipFiber = fiber;
  hookIndex = 0;
  wipFiber.hooks = [];
  var children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
}
function useState(initial) {
  var oldHook = wipFiber.alternate && wipFiber.alternate.hooks && wipFiber.alternate.hooks[hookIndex];
  var hook = {
    state: oldHook ? oldHook.state : initial
  };
  wipFiber.hooks.push(hook);
  hookIndex++;
  return [hook.state];
}
function updateHostComponent(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  // create new fibers
  var elements = fiber.props.children;
  reconcileChildren(fiber, elements);
}
function reconcileChildren(wipFiber, elements) {
  var index = 0;
  var oldFiber = wipFiber.alternate && wipFiber.alternate.child;
  var prevSibling = null;
  while (index < elements.length || oldFiber != null) {
    var _element = elements[index];
    var newFiber = null;
    var sameType = oldFiber && _element && _element.type == oldFiber.type;
    if (sameType) {
      //update the node
      newFiber = {
        type: oldFiber.type,
        props: _element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: "UPDATE"
      };
    }
    if (_element && !sameType) {
      //add this node
      newFiber = {
        type: _element.type,
        props: _element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: "PLACEMENT"
      };
    }
    if (oldFiber && !sameType) {
      //delete the oldFiber's node
      oldFiber.effectTag = "DELETION";
      deletions.push(oldFiber);
    }
    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }
    if (index == 0) {
      wipFiber.child = newFiber;
    } else if (_element) {
      prevSibling.sibling = newFiber;
    }
    prevSibling = newFiber;
    index++;
  }
}
var Didact = {
  createElement: createElement,
  render: render
};
function App(props) {
  return Didact.createElement("p", null, "hi,", props.name);
}
function Counter() {
  var _Didact$useState = Didact.useState(1),
    state = _Didact$useState[0],
    setState = _Didact$useState[1];
  return Didact.createElement("h1", {
    onClick: function onClick() {
      return setState(function (c) {
        return c + 1;
      });
    }
  }, "Count: ", state);
}
var element = /** @jsx Didact.createElement */
Didact.createElement("div", {
  id: "foo"
}, Didact.createElement("a", null, "bar"), Didact.createElement("b", null), Didact.createElement(App, {
  name: "world"
}), Didact.createElement(Counter, null));
var container = document.getElementById("root");
Didact.render(element, container);

// element = Didact.createElement("div", {
//   id: "foo"
// }, Didact.createElement("div", null, Didact.createElement("p", null, "1"), Didact.createElement("div", null, Didact.createElement("div", null, Didact.createElement("p", null, "1"), Didact.createElement("div", null, Didact.createElement("div", null, Didact.createElement("p", null, "1"), Didact.createElement("div", null)), Didact.createElement("div", null, Didact.createElement("p", null, "2"), Didact.createElement("div", null)), Didact.createElement("div", null, Didact.createElement("p", null, "3"), Didact.createElement("div", null)), Didact.createElement("div", null, Didact.createElement("p", null, "4"), Didact.createElement("div", null)), Didact.createElement("div", null, Didact.createElement("p", null, "5"), Didact.createElement("div", null)))), Didact.createElement("div", null, Didact.createElement("p", null, "2"), Didact.createElement("div", null)), Didact.createElement("div", null, Didact.createElement("p", null, "3"), Didact.createElement("div", null)), Didact.createElement("div", null, Didact.createElement("p", null, "4"), Didact.createElement("div", null)), Didact.createElement("div", null, Didact.createElement("p", null, "5"), Didact.createElement("div", null)))), Didact.createElement("div", null, Didact.createElement("p", null, "2"), Didact.createElement("div", null)), Didact.createElement("div", null, Didact.createElement("p", null, "3"), Didact.createElement("div", null)), Didact.createElement("div", null, Didact.createElement("p", null, "4"), Didact.createElement("div", null)), Didact.createElement("div", null, Didact.createElement("p", null, "5"), Didact.createElement("div", null)));
// setTimeout(()=>{
//   Didact.render(element, container);
// },3000);