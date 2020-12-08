// https://astexplorer.net/#/gist/865159bcc34e3148520d3ef4686a1647/69694ebbf3a705de43fcada456a7e018329894b2

//jscodeshift
// Press ctrl+space for code completion
export default function transformer(file, api) {
    const j = api.jscodeshift;
  
    return j(file.source)
      .find(j.JSXIdentifier)
      .forEach(path => {
          path.node.name="h";
      })
      .toSource()
}