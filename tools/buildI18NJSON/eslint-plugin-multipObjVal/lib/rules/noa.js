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
        fixable: "code",  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ],
        messages: {
            countTimes: "该值引用了 '{{ count }}' 次"
        }
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
        var countObj = {};
        return {
            // Identifier(node){
            //     if(node.name === "a"){
            //         context.report({
            //             node,
            //             // loc: 2,
            //             message: "再用a打屎",
            //             data: {
            //                 name: "a",
            //             },
            //             // fix(fixer) {
            //             //     return null;
            //             // }
            //         });
            //     }
            // },
            Property(node){
                if(node.value.type === 'Literal'){
                    let val = node.value.value;
                    if(countObj[val]){
                        countObj[val] = countObj[val] + 1;
                    }else{
                        countObj[val] = 1
                    }
    
                    if(countObj[val] > 1){
                        context.report({
                            node,
                            messageId: "countTimes",
                            data: {
                                count: countObj[val],
                            },
                            // fix(fixer) {
                            //     return null;
                            // }
                        });
                    }
                }
            }
        };
    }
};
