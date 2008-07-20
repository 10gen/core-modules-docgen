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
	@namespace Holds functionality related to running plugins.
*/
JSDOC.PluginManager = {
}

/**
	@param name A unique name that identifies that plugin.
	@param handlers A collection of named functions. The names correspond to hooks in the core code.
*/
JSDOC.PluginManager.registerPlugin = function(/**String*/name, /**Object*/handlers) {
	if (!defined(JSDOC.PluginManager.plugins))
		/** The collection of all plugins. Requires a unique name for each.
		*/
		JSDOC.PluginManager.plugins = {};
	
	
	JSDOC.PluginManager.plugins[name] = handlers;
}

/**
	@param hook The name of the hook that is being caught.
	@param target Any object. This will be passed as the only argument to the handler whose
	name matches the hook name. Handlers cannot return a value, so must modify the target
	object to have an effect.
*/
JSDOC.PluginManager.run = function(/**String*/hook, /**Mixed*/target) {
	for (var name in JSDOC.PluginManager.plugins) {
		if (defined(JSDOC.PluginManager.plugins[name][hook])) {
			JSDOC.PluginManager.plugins[name][hook](target);
		}
	}
}
