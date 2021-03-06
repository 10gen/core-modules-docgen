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

/** Handle the creation of HTML links to documented symbols.
	@constructor
*/
function Link() {
	this.alias = "";
	this.src = "";
	this.file = "";
	this.text = "";
	this.innerName = "";
	this.classLink = false;
	this.targetName = "";

	this.target = function(targetName) {
		if (defined(targetName)) this.targetName = targetName;
		return this;
	}
	this.inner = function(inner, num) {
            if (defined(inner)) this.innerName = inner;
            if(defined(num)) this.innerName = this.innerName+num;
            return this;
	}
	this.withText = function(text) {
		if (defined(text)) this.text = text;
		return this;
	}
	this.toSrc = function(filename) {
		if (defined(filename)) this.src = filename;
		return this;
	}
	this.toSymbol = function(alias) {
		if (defined(alias)) this.alias = new String(alias);
		return this;
	}
	this.toClass = function(alias) {
		this.classLink = true;
		return this.toSymbol(alias);
	}
	this.toFile = function(file) {
		if (defined(file)) this.file = file;
		return this;
	}

	this.toString = function() {
		var linkString;
		var thisLink = this;

		if (this.alias) {
			linkString = this.alias.replace(/(^|[^a-z$0-9_#.:-])([|a-z$0-9_#.:-]+)($|[^a-z$0-9_#.:-])/i,
				function(match, prematch, symbolName, postmatch) {
					var symbolNames = symbolName.split("|");
					var links = [];
					for (var i = 0, l = symbolNames.length; i < l; i++) {
						thisLink.alias = symbolNames[i];
						links.push(thisLink._makeSymbolLink(symbolNames[i]));
					}
					return prematch+links.join("|")+postmatch;
				}
			);
		}
		else if (this.src) {
			linkString = thisLink._makeSrcLink(this.src);
		}
		else if (this.file) {
			linkString = thisLink._makeFileLink(this.file);
		}

		return linkString;
	}
}

/** prefixed for hashes */
Link.hashPrefix = "";

/** Appended to the front of relative link paths. */
Link.base = "";

Link.symbolNameToLinkName = function(symbol) {
	var linker = "";
	if (symbol.isStatic) linker = ".";
	else if (symbol.isInner) linker = "-";

    return Link.hashPrefix+linker+(symbol.name || symbol._name);
}

/** Create a link to a snother symbol. */
Link.prototype._makeSymbolLink = function(alias) {
    var linkBase = publish.conf.symbolsDirName;
    var linkTo = Link.symbolSet.getSymbol(alias);
    if(!linkTo) {
        var linkTypes = ["methods", "properties"];
        for(var z in linkTypes) {
            for(var i in Link.symbolSet) {
                for(var j in Link.symbolSet[i][linkTypes[z]]) {
                    if(Link.symbolSet[i][linkTypes[z]][j].name == alias) {
                        if(Link.symbolSet[i][linkTypes[z]][j].isStatic) alias = "."+alias.substring(alias.lastIndexOf(".")+1);
                        else if(Link.symbolSet[i][linkTypes[z]][j].isInner) alias = "-"+alias;
                        alias = "#"+alias;
                        linkTo = Link.symbolSet[i][linkTypes[z]][j];
                        break;
                    }
                    else if(Link.symbolSet[i][linkTypes[z]][j].alias == alias) {
                        alias = alias.substring(alias.indexOf("#")+1);
                        if(Link.symbolSet[i][linkTypes[z]][j].isStatic) alias = "."+alias.substring(alias.lastIndexOf(".")+1);
                        else if(Link.symbolSet[i][linkTypes[z]][j].isInner) alias = "-"+alias;
                        alias = "#"+alias;
                        linkTo = Link.symbolSet[i][linkTypes[z]][j];
                        break;
                    }
                }
            }
        }
    }
    var linkPath;
    var target = (this.targetName)? " target=\""+this.targetName+"\"" : "";

    // is it an internal link?
    if (alias.charAt(0) == "#") var linkPath = alias;

    // if there is no symbol by that name just return the name unaltered
    else if (!linkTo) return this.text || alias;

    // it's a symbol in another file
    else {

	if ((!linkTo.isa == "CONSTRUCTOR" || (linkTo.is && !linkTo.is("CONSTRUCTOR"))) && !linkTo.isNamespace) { // it's a method or property
	    linkPath = escape(linkTo.memberOf) || "_global_";
	    linkPath += "#" + Link.symbolNameToLinkName(linkTo);
	}
	else {
	    linkPath = escape(linkTo.alias);
	    linkPath += (this.classLink? "":"#" + Link.hashPrefix + this.innerName);
	}
	linkPath = linkBase + linkPath
    }

    var linkText = this.text || alias;

    var link = {linkPath: linkPath, linkText: linkText};

    if (typeof JSDOC.PluginManager != "undefined") {
	JSDOC.PluginManager.run("onSymbolLink", link);
    }

    return "<a href=\""+link.linkPath+"\""+target+">"+link.linkText+"</a>";
}

/** Create a link to a source file. */
Link.prototype._makeSrcLink = function(srcFilePath) {
	var target = (this.targetName)? " target=\""+this.targetName+"\"" : "";

	// transform filepath into a filename
	var srcFile = srcFilePath.replace(/\.\.?[\\\/]/g, "").replace(/[:\\\/]/g, "_");
	var outFilePath = Link.base + publish.conf.srcDir + srcFile + publish.conf.ext;

	if (!this.text) this.text = FilePath.fileName(srcFilePath);
	return "<a href=\""+outFilePath+"\""+target+">"+this.text+"</a>";
}

/** Create a link to a source file. */
Link.prototype._makeFileLink = function(filePath) {
	var target = (this.targetName)? " target=\""+this.targetName+"\"" : "";

	var outFilePath =  Link.base + filePath;

	if (!this.text) this.text = filePath;
	return "<a href=\""+outFilePath+"\""+target+">"+this.text+"</a>";
}
