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
	@param columns The number of columns.
*/
function Layout(/**int*/columns){
	/**
		@param [id] The id of the element.
		@param elName The name of the element.
	*/
	this.getElement = function(
		/** string */ elName,
		/** number|string */ id
	) {
	};
	
	/** 
		@constructor
	 */
	this.Canvas = function(top, left, /**int*/width, height) {
		/** Is it initiated yet? */
		this.initiated = true;
	}
	
	this.rotate = function(/**nothing*/) {
	}
	
	/** 
	@param x
	@param y
	@param {zoppler} z*/
	this.init = function(x, y, /**abbler*/z) {
		/** The xyz. */
		this.xyz = x+y+z;
		this.getXyz = function() {
		}
	}
}
