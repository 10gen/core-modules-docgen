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
function Hash() {
	this.reset();
}

Hash.prototype.reset = function() {
	this.elements = {};
}

Hash.prototype.put = function() {
	for (var i = 0, l = arguments.length; i < l; i++) {
		this.elements[arguments[i]] = arguments[++i];
	}
}

Hash.prototype.has = function(key) {
	return this.elements.hasOwnProperty(key);
}

Hash.prototype.get = function(key) {
	return (this.has(key)) ? this.elements[key] : undefined;
}

Hash.prototype.drop = function(key) {
	if (this.has(key)) {
		delete this.elements[key];
	}
}

Hash.prototype.rename = function(oldKey, newKey) {
	if (oldKey != newKey && this.has(oldKey)) {
		this.elements[newKey] = this.elements[oldKey];
		delete this.elements[oldKey];
	}
}

Hash.prototype.keys = function() {
	var keys = [];
	for (var key in this.elements) if (this.has(key)) keys.push(key);
	return keys;
}

Hash.prototype.values = function() {
	var values = [];
	for (var key in this.elements) if (this.has(key)) values.push(this.get(key));
	return values;
}
