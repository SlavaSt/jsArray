var d = document;

function Array2(array) {
	this.array = array;
	return CaseClass(Array2, arguments)
}

var Arrays = {};

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

if (!String.prototype.trim) {
String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function defaultFor(arg, val) { 
  return typeof arg !== 'undefined' ? arg : val; 
}

// TODO what the fuck is that?
// This is a constructor that is used to setup inheritance without
// invoking the base's constructor. It does nothing, so it doesn't
// create properties on the prototype
function surrogateCtor() {}

function extend(base, sub) {
  // Copy the prototype from the base to setup inheritance
  surrogateCtor.prototype = base.prototype;
  // Tricky huh?
  sub.prototype = new surrogateCtor();
  // Remember the constructor property was set wrong, let's fix it
  sub.prototype.constructor = sub;
}

function isUndefined(arg) {
	return typeof something === "undefined"
}

function construct(constructor, args) {
    function F() {
        return constructor.apply(this, args);
    }
    F.prototype = constructor.prototype;
    return new F();
}

function CaseClass(superClass, args) {
	if (CaseClass.flag) {
		CaseClass.flag = false;
		return construct(superClass, args);
	}
}
// relying on javascript single threadness. Otherwise would have to use stripe of flags
CaseClass.flag = true;