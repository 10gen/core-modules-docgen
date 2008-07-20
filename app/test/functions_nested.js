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

/** @constructor */
function Zop() {
}

/**
 @class
*/
Foo = function(id) {
	// this is a bit twisted, but if you call Foo() you will then
	// modify Foo(). This is kinda, sorta non-insane, because you
	// would have to call Foo() 100% of the time to use Foo's methods
	Foo.prototype.methodOne = function(bar) {
	  alert(bar);
	};
	
	// same again
	Foo.prototype.methodTwo = function(bar2) {
	  alert(bar2);
	};
	
	// and these are only executed if the enclosing function is actually called
	// and who knows if that will ever happen?
	Bar = function(pez) {
	  alert(pez);
	};
	Zop.prototype.zap = function(p){
		alert(p);
	};
	
	// but this is only visible inside Foo
	function inner() {
	}
};
