exports.handlers = {
    newDoclet: function(e) {
        // e.doclet will refer to the newly created doclet
        // you can read and modify properties of that doclet if you wish
        // console.log(e.doclet.meta.code);
        // console.log(e.doclet.params);
        // console.log(e.doclet.description);
        // console.log(e.doclet.tags);
        // console.log(e);
        if (typeof e.doclet.description === 'string') {
            e.doclet.description = e.doclet.description.toUpperCase();
        }
    },
    beforeParse: function(e) {
        // console.log(e.source);
    }
};

//在newDoclet触发之前
exports.defineTags = function(dictionary) {
    // console.log(1);
    dictionary.defineTag('www', {
        onTagged: function(doclet, tag) {
            // console.log(tag);
            doclet.scope = "instance";
        }
    }).synonym('mmm');//同义词
};

exports.astNodeVisitor = {
    visitNode: function(node, e, parser, currentSourceName) {
        // console.log(node);
        // do all sorts of crazy things here
    }
};