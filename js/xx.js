/**
 * @param {number[]} nums
 * @return {boolean}
 */
// var isStraight = function(nums) {
//     const mapJson = {}
//     const l = nums.length;
//     var min = 13;
//     for(var i = 0;i < l;i++){
//         if(nums[i] !== 0 && nums[i] < min){
//             min = nums[i];
//         }
//         if(mapJson[nums[i]]){
//             mapJson[nums[i]] += 1;
//         }else{
//             mapJson[nums[i]] = 1;
//         }
//     }

//     if(min == 13){
//         return false;
//     }

//     function checkHaveNext(curNum){
//         if(!mapJson[curNum + 1] && !mapJson[0]){
//             return false;
//         }else if(!mapJson[curNum + 1] && mapJson[0]){
//             mapJson[0] -= 1;
//             return true;
//         }else{
//             return true;
//         }
//     }

//     let s = 0;
//     let checkTimes = l - 1;
//     while(s < checkTimes){
//         if(!checkHaveNext(min + (s))){
//             return false;
//         }
//         s++;
//     }
//     return true;
// };

// var isStraight = function(nums) {
//     nums.sort(function(a,b){return a - b});
//     var zeroCnt=0;
//     var diff=0;
//     for(var i=0;i<nums.length-1;i++){
//         if(nums[i]==0){
//             zeroCnt++;
//         }else{
//             if(nums[i]==nums[i+1]) return false;
//             if(nums[i]+1!=nums[i+1]){
//                 diff+=nums[i+1]-nums[i]-1;
//             }
//         }
//     }
//     return zeroCnt>=diff;
// };

// var isStraight = function(nums) {
//     var min = 14,max = 0;
//     var mapJson = {};
//     var l = nums.length;
//     for(var i=0;i<l;i++){
//         if(nums[i]==0)continue;
//         if(mapJson[nums[i]])return false;
//         min = Math.min(nums[i],min);
//         max = Math.max(nums[i],max);
//         mapJson[nums[i]] = 1;
//     }
//     return max - min < l;
// };

// var isStraight = function(nums) {
//     nums.sort(function(a,b){return a - b});
//     var min;
//     var l = nums.length;
//     var haveMin = false;
//     for(var i=0;i<l;i++){
//         if(haveMin){
//             if(nums[i] == nums[i + 1])return false
//         }else{
//             if(nums[i]!=0){
//                 min = nums[i];
//                 haveMin = true;
//                 if(nums[i] == nums[i + 1])return false
//             }
//         }
        
//     }

//     return nums[l-1] - min < l;
// };

var isStraight = function(nums) {
    nums.sort(function(a,b){return a - b});
    var min;
    var l = nums.length;
    var joke = 0;
    for(var i=0;i<l;i++){
        if(nums[i]!=0){
            if(nums[i] == nums[i + 1])return false
        }else{
            joke ++
        }
    }

    return nums[l-1] - nums[joke] < l;
};



console.log(isStraight([0,0,2,2,5]));
// console.log(isStraight([1,0,3,2,6]));
// console.log(isStraight([1,2,3,4,5]));
// console.log(isStraight([13,12,11,10,8]));
// console.log(isStraight([0,0,13,10,9]));
// console.log(isStraight([0,0,13,10,8]));