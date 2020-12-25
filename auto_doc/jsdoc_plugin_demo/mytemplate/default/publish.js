/**
 * Generate documentation output.
 *
 * @param {TAFFY} data - A TaffyDB collection representing
 *                       all the symbols documented in your code.
 * @param {object} opts - An object with options information.
 * @param {Tutorial} tutorials
 */
exports.publish = function(taffyData, opts, tutorials) {
    // 我们需要的数据都在 taffyData 中
    taffyData().each(doclet=>{
        console.log(doclet);
    })
}