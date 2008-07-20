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

if (typeof JSDOC == "undefined") JSDOC = {};

/**
	@constructor
*/
JSDOC.Token = function(data, type, name) {
	this.data = data;
	this.type = type;
	this.name = name;
}

JSDOC.Token.prototype.toString = function() { 
	return "<"+this.type+" name=\""+this.name+"\">"+this.data+"</"+this.type+">";
}

JSDOC.Token.prototype.is = function(what) {
	return this.name === what || this.type === what;
}
