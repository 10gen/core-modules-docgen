/**
*      Copyright (C) 2008 10gen Inc.
*  
*    Licensed under the Apache License, Version 2.0 (the "License");
*    you may not use this file except in compliance with the License.
*    You may obtain a copy of the License at
*  
*       http://www.apache.org/licenses/LICENSE-2.0
*  
*    Unless required by applicable law or agreed to in writing, software
*    distributed under the License is distributed on an "AS IS" BASIS,
*    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*    See the License for the specific language governing permissions and
*    limitations under the License.
*/

/**@constructor*/
function Reflection(obj) {
	this.obj = obj;
}

Reflection.prototype.getConstructorName = function() {
	if (this.obj.constructor.name) return this.obj.constructor.name;
	var src = this.obj.constructor.toSource();
	var name = src.substring(name.indexOf("function")+8, src.indexOf('(')).replace(/ /g,'');
	return name;
}

Reflection.prototype.getMethod = function(name) {
	for (var p in this.obj) {
		if (p == name && typeof(this.obj[p]) == "function") return this.obj[p];
	}
	return null;
}

Reflection.prototype.getParameterNames = function() {
	var src = this.obj.toSource();
	src = src.substring(
		src.indexOf("(", 8)+1, src.indexOf(")")
	);
	return src.split(/, ?/);
}
