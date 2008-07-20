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
function Layout(p) {
	/** initilize 1 */
	this.init = function(p) {
	}
	
	/** get the id */
	this.getId = function() {
	}
	
	/** @type string */
	this.orientation = "landscape";
	
	function getInnerElements(elementSecretId){
	}
}

/**
@constructor
@borrows Layout#orientation as #orientation
@borrows Layout-getInnerElements as myGetInnerElements
*/
function Page() {
	/** reset the page */
	this.reset = function(b) {
	}
}

/**
@constructor
@borrows Layout.prototype.orientation as this.orientation
@borrows Layout.prototype.init as #init
@inherits Page.prototype.reset as #reset
*/
function ThreeColumnPage() {
	/** initilize 2 */
	this.init = function(p) {
	}
}
