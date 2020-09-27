function trueAssign(target){
    if (target == null) { // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
    }
    var to = Object(target);

    for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) { // Skip over if undefined or null
            for (var nextKey in nextSource) {
                // Avoid bugs when hasOwnProperty is shadowed
                if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                    if(typeof nextSource[nextKey] === 'object'&& typeof to[nextKey] === 'object'){
                        to[nextKey] = trueAssign(to[nextKey], nextSource[nextKey]);
                    }else{
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
        }
    }

    return to;
}