// testing circular borrows

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
	@class
	@borrows Bar#zop as this.my_zop
*/
function Foo() {
	/** this is a zip. */
	this.zip = function() {}
	
	this.my_zop = new Bar().zop;
}

/**
	@class
	@borrows Foo#zip as this.my_zip
*/
function Bar() {
	/** this is a zop. */
	this.zop = function() {}
	
	this.my_zip = new Foo().zip;
}
