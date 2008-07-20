
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

/**
	@constructor
*/
JSDOC.TextStream = function(text) {
	if (typeof(text) == "undefined") text = "";
	text = ""+text;
	this.text = text;
	this.cursor = 0;
}

JSDOC.TextStream.prototype.look = function(n) {
	if (typeof n == "undefined") n = 0;
	
	if (this.cursor+n < 0 || this.cursor+n >= this.text.length) {
		var result = new String("");
		result.eof = true;
		return result;
	}
	return this.text.charAt(this.cursor+n);
}

JSDOC.TextStream.prototype.next = function(n) {
	if (typeof n == "undefined") n = 1;
	if (n < 1) return null;
	
	var pulled = "";
	for (var i = 0; i < n; i++) {
		if (this.cursor+i < this.text.length) {
			pulled += this.text.charAt(this.cursor+i);
		}
		else {
			var result = new String("");
			result.eof = true;
			return result;
		}
	}

	this.cursor += n;
	return pulled;
}
