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

JSDOC.PluginManager.registerPlugin(
	"JSDOC.tagParamConfig",
	{
		onDocCommentTags: function(comment) {
			var currentParam = null;
			var tags = comment.tags;
			for (var i = 0, l = tags.length; i < l; i++) {
				
				if (tags[i].title == "param") {
					if (tags[i].name.indexOf(".") == -1) {
						currentParam = i;
					}
				}
				else if (tags[i].title == "config") {
					tags[i].title = "param";
					if (currentParam == null) {
						tags[i].name = "arguments"+"."+tags[i].name;
					}
					else if (tags[i].name.indexOf(tags[currentParam].name+".") != 0) {
						tags[i].name = tags[currentParam].name+"."+tags[i].name;
					}
					currentParam != null
					//tags[currentParam].properties.push(tags[i]);
				}
				else {
					currentParam = null;
				}
			}
		}
	}
);
