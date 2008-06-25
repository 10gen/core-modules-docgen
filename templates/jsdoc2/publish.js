IO.include("../templates/json/json2.js");
// move to www

function publish(symbolSet) {
    if(!symbolSet.fromJava) {
        try {
            symbolSet = eval("("+symbolSet+")");
        }
        catch(e) {
            print("error eval-ing symbolSet: "+symbolSet);
            quit();
        }
    }

    publish.conf = {  // trailing slash expected for dirs
	ext: ".jxp",
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

    IO.mkPath((publish.conf.outDir+"symbols").split("/"));

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

    if(true) {
        var classes = [];
        var symbols = [];
        for(var i in symbolSet) {
            if(i == "fromJava") continue;

            // add some functions to the obj
            symbolSet[i].isBuiltin = function() { return false; };
            symbolSet[i].is = function(str) { return this.isa == str; };
            symbolSet[i].comment.getTag = function(str) { return []; };
            if (!symbolSet[i].params) symbolSet[i].params = [];

            // add to the collection of symbols and maybe the class collection
            symbols.push(symbolSet[i]);
            if(symbolSet[i].isa == "CONSTRUCTOR") classes.push(symbolSet[i]);
        }
        symbolSet.getSymbol = function(str) { return symbolSet[str]; };

    }

    publish.classesIndex = classesTemplate.process();

    // hack: strip the ../../path off of the output dir
    var docUrl = publish.conf.outDir;
    while(docUrl.indexOf("..") >= 0) {
        docUrl = docUrl.substring(docUrl.indexOf("/")+1);
    }
    docUrl = docUrl.substring(docUrl.indexOf("/")+1);


    Link.base = "../"+docUrl;
    for (var i = 0, l = classes.length; i < l; i++) {
        if(classes[i] == true) continue;
	var symbol = classes[i];
	var output = "";
	output = classTemplate.process(symbol);

//	IO.saveFile(publish.conf.outDir+"symbols/", symbol.alias+publish.conf.ext, output);
	IO.saveFile(publish.conf.outDir, symbol.alias+publish.conf.ext, output);
    }
    // regenrate the index with different relative links
    Link.base = ""+docUrl;

    // publish.js will be run every time a db obj is rendered.  Some pages don't need to be rerendered every time
    if(!IO.exists(publish.conf.outDir+"index"+publish.conf.ext)) {
        var classesIndex = classesindexTemplate.process();
        IO.saveFile(publish.conf.outDir, "index"+publish.conf.ext, classesIndex);
        classesindexTemplate = classesIndex = classes = null;

        var output = searchTemplate.process();
        IO.saveFile(publish.conf.outDir, "search"+publish.conf.ext, output);

        IO.saveFile(publish.conf.outDir, "default.css", IO.readFile(publish.conf.templatesDir+"static/default.css"));
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

function makeSrcFile(path, srcDir, name) {
    if (JSDOC.opt.s) return;

    if (!name) {
	name = path.replace(/\.\.?[\\\/]/g, "").replace(/[\\\/]/g, "_");
	name = name.replace(/\:/g, "_");
    }

    var src = {path: path, name:name, charset: IO.encoding, hilited: ""};

    if (defined(JSDOC.PluginManager)) {
	JSDOC.PluginManager.run("onPublishSrc", src);
    }

    if (src.hilited) {
	IO.saveFile(srcDir, name+publish.conf.ext, src.hilited);
    }
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
            if($.name) return $.name;
            else return $;
	}
    ).join(", ")
    +
    ")";
    return signature;
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