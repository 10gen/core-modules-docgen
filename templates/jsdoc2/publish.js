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

IO.include("../templates/json/json2.js");

function publish(symbolSet) {

    publish.conf = {  // trailing slash expected for dirs
	ext: ".out",
	outDir: JSDOC.opt.d || SYS.pwd+"../out/jsdoc/",
	templatesDir: SYS.pwd+"../templates/jsdoc2/",
        symbolsDirName : "", //"symbols/"
    };
    publish.conf.symbolsDir = publish.conf.outDir;//+"/symbols/";

    if (JSDOC.opt.s && defined(Link) && Link.prototype._makeSrcLink) {
	Link.prototype._makeSrcLink = function(srcFilePath) {
	    return "&lt;"+srcFilePath+"&gt;";
	}
    }
    if( !JSDOC.opt.D ) JSDOC.opt.D = {};

    // used to check the details of things being linked to
    Link.symbolSet = symbolSet;

    try {
	var classTemplate = new JSDOC.JsPlate(publish.conf.templatesDir+"class.tmpl");
	var classesTemplate = new JSDOC.JsPlate(publish.conf.templatesDir+"allclasses.tmpl");
        var classesindexTemplate = new JSDOC.JsPlate(publish.conf.templatesDir+"index.tmpl");
        var searchTemplate = new JSDOC.JsPlate(publish.conf.templatesDir+"search.tmpl");
    }
    catch(e) {
	print(e.message);
	quit();
    }

    // filters
    function hasNoParent($) {return ($.memberOf == "")}
    function isaFile($) { return ($.is("FILE"))}
    function isaClass($) { return ($.is("CONSTRUCTOR") || $.isNamespace)}

    var classes = [];
    var symbols = [];
    for(var i in symbolSet) {
        // add some functions to the obj
        symbolSet[i].isBuiltin = function() { return false; };
        symbolSet[i].is = function(str) { return this.isa == str; };
        symbolSet[i].comment.getTag = function(str) { return []; };
        if (!symbolSet[i].params) symbolSet[i].params = [];

        // add to the collection of symbols and maybe the class collection
        symbols.push(symbolSet[i]);
        if(symbolSet[i].isa == "CONSTRUCTOR" || symbolSet[i].isNamespace) classes.push(symbolSet[i]);
        }
    symbolSet.getSymbol = function(str) { return symbolSet[str]; };

    publish.classesIndex = classesTemplate.process();

    // hack: strip the ../../path off of the output dir
    var docUrl = publish.conf.outDir;
    while(docUrl.indexOf("..") >= 0) {
        docUrl = docUrl.substring(docUrl.indexOf("/")+1);
    }
    docUrl = docUrl.substring(docUrl.indexOf("/")+1);

    for (var i = 0, l = classes.length; i < l; i++) {
	var symbol = classes[i];
        // if this is a javascript class, the constructor is part of the main object.  separate it out before processing.
        if(symbol.desc && symbol._params) {
            if(!symbol.constructors) symbol.constructors = [];
            symbol.constructors.push({ desc : symbol.desc, name : symbol._name, _params : symbol._params, alias : symbol.alias, isPublic : true, isa : "CONSTRUCTOR", memberOf : symbol._name});
        }
	var output = "";
	output = classTemplate.process(symbol);

	IO.saveFile(publish.conf.outDir, symbol.alias+publish.conf.ext, output);
    }
    // regenrate the index with different relative links
    Link.base = ""+docUrl;

    // publish.js will be run every time a db obj is rendered.  Some pages don't need to be rerendered every time
    if(!IO.exists(publish.conf.outDir+"index.jxp")) {
        var classesIndex = classesindexTemplate.process();
        IO.saveFile(publish.conf.outDir, "index.jxp", classesIndex);
        classesindexTemplate = classesIndex = classes = null;

        var output = searchTemplate.process();
        IO.saveFile(publish.conf.outDir, "search.jxp", output);

        IO.mkPath((publish.conf.outDir+"assets").split("/"));
        IO.saveFile(publish.conf.outDir+"assets/", "default.css", IO.readFile(publish.conf.templatesDir+"static/default.css"));
    }
}


/** Just the first sentence. */
function summarize(desc) {
    if (typeof desc != "undefined")
	return desc.match(/([\w\W]+?\.)[^a-z0-9]/i)? RegExp.$1 : desc;
}

/** make a symbol sorter by some attribute */
function makeSortby(attribute) {
    return function(a, b) {
	if (a[attribute] != undefined && b[attribute] != undefined) {
	    a = a[attribute].toLowerCase();
	    b = b[attribute].toLowerCase();
	    if (a < b) return -1;
	    if (a > b) return 1;
	    return 0;
	}
    }
}

function include(path) {
    var path = publish.conf.templatesDir+path;
    return IO.readFile(path);
}

function makeSrcLink(path) {
    if(path)
        return '<a href="code='+path.substring(1, path.lastIndexOf(".")).replace(/\//g, ".")+'.js">'+path+'</a>';
    else
        return "No source file specified.";
}

function makeSignature(params) {
    if (!params) return "()";
    var signature = "("
	+
    params.filter(
	function($) {
            if($.name) return $.name.indexOf(".") == -1; // don't show config params in signature
            else return true;
	}
    ).map(
	function($) {
            var type = ($.type ? $.type+" " : "");
            if($.name) return type+$.name;
            else return type+$;
	}
    ).join(", ")
    +
    ")";
    return signature;
}

function isConstructor(data) {
    return (data.isa == "CONSTRUCTOR");
}

/** Find symbol {@link ...} strings in text and turn into html links */
function resolveLinks(str, from) {
    if(!str) str = "";
    str = str.replace(/\{@link ([^} ]+) ?\}/gi,
                                                function(match, symbolName) {
	return new Link().toSymbol(symbolName);
    }
    );

    return str;
}

function anonClassLink(cls, str) {
    return '<a href="'+cls+"#anon"+str+'">'+str+"</a>";
}

function anonClassAnchor(str) {
    return "anon"+str;
}