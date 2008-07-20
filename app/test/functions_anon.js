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

/** an anonymous constructor executed inline */
a = new function() {
	/** a.b*/
    this.b = 1;
    /** a.f */
    this.f = function() {
    	/** a.c */
    	this.c = 2;
    }
}


/**
	named function executed inline
*/
bar1 = function Zoola1() {
	/** property of global */
	this.g = 1;
}();

/**
	named constructor executed inline
*/
bar2 = new function Zoola2() {
	/** property of bar */
	this.p = 1;
};

/** module pattern */
module = (function () {
	/** won't appear in documentation */
	var priv = 1;
	
	/** @scope module */
	return {
		/** will appear as a property of module */
		pub: 1
	}
})();
