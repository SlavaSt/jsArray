var d = document;

var Array2 = function(array) {
	this.array = array;
	return new _Array2(array);
}

var _Array2 = function(array) {
	this.array = array;
}

_Array2.prototype = Array2.prototype;

function Arrays() {}

Arrays.flatten = function(array) {
	return [].concat.apply([], array);
}

Array2.prototype.flatten = function() {
	return Arrays.flatten(this.array);
}

Arrays.deepFlatten = function(array) {
	if (!Array.isArray(array)) return array;
	var result = [];
	for (var i in array) {
		var el = array[i];
		if (Array.isArray(array)) result = result.concat(Arrays.deepFlatten(el));
		else result = result.concat(el);
	}
	return result;
}

Array2.prototype.deepFlatten = function() {
	return Arrays.deepFlatten(this.array); 
}

// for old browsers
if(!Array.isArray) {
  Array.isArray = function (vArg) {
    return Object.prototype.toString.call(vArg) === "[object Array]";
  };
}