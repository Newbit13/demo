module.exports =  function relativeDir(relative, absolute) {
    var rela = relative.split('/');
    rela.shift();
    var abso = absolute.split('/'); 
    abso.shift();

	var num = 0;
	
	for (var i = 0; i < rela.length; i++) {
        if(rela[i] === abso[i]) {
            num++;
        } else {
			break;
		}
    }
	
	rela.splice(0, num);
	abso.splice(0, num);
	
	var str = '';
	
	for (var j = 0;j < abso.length - 1; j++) {
		str += '../';
	}
	
	if (!str) {
		str += './';
	}
	
	str += rela.join('/');
	
    return str;
}