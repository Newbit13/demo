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
                            node,//有loc时位置通过loc获取而非node
                            messageId: "countTimes",
                            data: {
                                count: countObj[val],
                            },
                            fix(fixer) {
                                node.range[1] = node.range[1] + 1;//加个逗号
                                return fixer.removeRange(node.range);
                            }
                        });
                    }
                }
            }
        };
    }
};
