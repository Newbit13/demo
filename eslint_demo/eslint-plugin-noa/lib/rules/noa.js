/**
 * @fileoverview sssss
 * @author noa-rule1
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "suggestion",
        docs: {
            description: "no a aaaaaaaaa",
            category: "Possible Errors",
            recommended: true,
            url: "https://www.baidu.com"
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ]
    },

    create: function(context) {

        // variables should be defined here

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        // any helper functions should go here or else delete this section

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            Identifier(node){
                if(node.name === "a"){
                    context.report({
                        node,
                        messageId: "avoidName",
                        data: {
                            name: "a",
                        }
                    });
                }
            }
        };
    }
};
