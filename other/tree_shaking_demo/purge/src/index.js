const posthtml = require("posthtml");
const selectorParser = require("postcss-selector-parser");
const fs = require("fs");

function htmlExtractor(html, extractInfo) {
  const content = fs.readFileSync(html, "utf-8");

  const extractPlugin = (options) => (tree) => {
    return tree.walk((node) => {
      extractInfo.tag.push(node.tag);
      if (node.attrs) {
        extractInfo.id.push(node.attrs.id);
        extractInfo.class.push(node.attrs.class);
      }
      return node;
    });
  };

  posthtml([extractPlugin()]).process(content);
  // console.log(extractInfo);
  extractInfo.id = extractInfo.id.filter(Boolean);
  extractInfo.class = extractInfo.class.filter(Boolean);
  extractInfo.tag = extractInfo.tag.filter(Boolean);
  // console.log(extractInfo);
}

const purgePlugin = (options) => {
  const extractInfo = {
    id: [],
    class: [],
    tag: [],
  };

  // 获取id，class，tag标签
  htmlExtractor(options && options.html, extractInfo);

  const transformSelector = (selectors) => {
    selectors.walk((selector) => {
      selector.nodes &&
        selector.nodes.forEach((selectorNode) => {
          let shouldRemove = false;
          switch (selectorNode.type) {
            case "tag":
              if (extractInfo.tag.indexOf(selectorNode.value) == -1) {
                shouldRemove = true;
              }
              break;
            case "class":
              if (extractInfo.class.indexOf(selectorNode.value) == -1) {
                shouldRemove = true;
              }
              break;
            case "id":
              if (extractInfo.id.indexOf(selectorNode.value) == -1) {
                shouldRemove = true;
              }
              break;
          }

          if (shouldRemove) {
            selectorNode.remove();
          }
        });
    });
  };

  return {
    postcssPlugin: "postcss-purge",
    Rule(rule) {
      // 这里面n个选择器就执行n次
      // rule.selector 是选择器
      //   .aaa, ee , ff{}是一个选择器
      //   .bbb{}也是一个选择器
      const newSelector = rule.selector
        .split(",")
        .map((item) => {
          const transformed = selectorParser(transformSelector).processSync(
            item
          );

          return transformed !== item ? "" : item;
        })
        .filter(Boolean)
        .join(",");
      if (newSelector === "") {
        rule.remove();
      } else {
        rule.selector = newSelector;
      }
    },
  };
};

module.exports = purgePlugin;
