
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
 * Builtin object.
 * @class
 * @name Array
 */
 
/**#@+
 * Extension to builtin array.
 * @memberOf Array
 * @method
 */
 
/**
 * @returns Boolen if some array members...
 */
Array.prototype.some = function(){};

/**
 * Change every element of an array.
 * @returns Filtered array copy.
 */
Array.prototype.filter = function(){};

/**#@-*/


/**
 * A first in, first out data structure.
 * @constructor
 */
Queue = function(){};

/**#@+
 * Extension to Queue.
 * @memberOf Queue
 */

rewind = function(){
}

// should close automatically here.
