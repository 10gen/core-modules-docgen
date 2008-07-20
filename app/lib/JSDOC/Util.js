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
 * @namespace
 * @deprecated Use {@link FilePath} instead.
 */
JSDOC.Util = {
}

/**
 * @deprecated Use {@link FilePath.fileName} instead.
 */
JSDOC.Util.fileName = function(path) {
	LOG.warn("JSDOC.Util.fileName is deprecated. Use FilePath.fileName instead.");
	var nameStart = Math.max(path.lastIndexOf("/")+1, path.lastIndexOf("\\")+1, 0);
	return path.substring(nameStart);
}

/**
 * @deprecated Use {@link FilePath.fileExtension} instead.
 */
JSDOC.Util.fileExtension = function(filename) {
	LOG.warn("JSDOC.Util.fileExtension is deprecated. Use FilePath.fileExtension instead.");
	return filename.split(".").pop().toLowerCase();
};

/**
 * @deprecated Use {@link FilePath.dir} instead.
 */
JSDOC.Util.dir = function(path) {
	LOG.warn("JSDOC.Util.dir is deprecated. Use FilePath.dir instead.");
	var nameStart = Math.max(path.lastIndexOf("/")+1, path.lastIndexOf("\\")+1, 0);
	return path.substring(0, nameStart-1);
}
