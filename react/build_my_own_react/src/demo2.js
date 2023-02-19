/**
 * 引入fiber，通过performUnitOfWork来创建fiber并创建dom，并渲染dom
 */

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function render(element, container) {
  nextUnitOfWork = {
    dom: container,
    props: {
      children: [element],
    },
  };
}

function createDom(fiber) {
  const dom =
    fiber.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type);

  const isProperty = (key) => key !== "children";
  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = fiber.props[name];
    });

  return dom;
}

let nextUnitOfWork = null;

function workLoop(deadline) {
  let shouldYield = false;
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
  const elements = fiber.props.children;
  let index = 0;
  let prevSibling = null;

  while(index < elements.length){
    const element = elements[index];

    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null,
    }

    if(index == 0){
      fiber.child = newFiber
    }else{
      prevSibling.sibling = newFiber;
    }
    prevSibling = newFiber;
    index++;
  }
  // return next unit of work
  if(fiber.child){
    return fiber.child;
  }
  let nextFiber = fiber;
  while(nextFiber){
    if(nextFiber.sibling){
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
}

let Didact = {
  createElement,
  render,
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

const container = document.getElementById("root");
Didact.render(element, container);
