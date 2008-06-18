require("app/JsHilite.js");

JsDoc.tmpVersion = " Spicey Template 1.0.3";

String.prototype.trim = function () { return this.replace(/^\s*/, "").replace(/\s*$/, "").replace(/\n/g,"").replace(/>[\t\s]*</g,"><"); }

/* Don't understand why but a few ppl are still using other operating systems
    Yeah even developers, I know I don't get it either?!! */
function isNOTLINUX(docs){	if (docs.indexOf("\\") > -1){return true;};	return false;}

function publish(fileGroup, context) {	
	var file_template = new JsPlate(context.t+"file.tmpl");
	var obj_template = new JsPlate(context.t+"objects.tmpl");
	var index = {dirs: 0};
	var parents = {};
	var docs = "" + context._;
	var delim = (isNOTLINUX(docs)) ? "\\" : "/";
	if (docs.substr(docs.length -1, docs.length) == delim ){ docs = docs.substr(0, docs.length - 1) }
	var base = docs.substr(docs.lastIndexOf(delim), docs.length);
	for (var i = 0; i < fileGroup.files.length; i++) {
		if (context.d) {
			print("Publishing :: " + fileGroup.files[i].path);
			var our_name = "_"+((i+1<10)?"0"+(i+1):(i+1))+".htm";
			var fpath = fileGroup.files[i].path;
			start = fpath.indexOf(base);
			fdir = fpath.substr(start , (fpath.lastIndexOf('/')) - start);
			if (typeof index[fdir] === "undefined"){ index[fdir] = {}; index.dirs++; };
			index[fdir][our_name] = {htm: our_name, name: (fileGroup.files[i].filename), classes: [], funcs: [], vars: [], namespaces: []};
			for (var s = 0, symbol=null; symbol = fileGroup.files[i].symbols[s]; s++) {
				if (symbol.isa == "FUNCTION") {
					index[fdir][our_name].funcs.push(symbol.alias);
				}else if (symbol.isa == "CONSTRUCTOR") {
					if (!symbol.isStatic){
						index[fdir][our_name].classes.push(symbol.alias);
					}else{
						index[fdir][our_name].namespaces.push(symbol.alias);
					}
				}else if (symbol.isa == "OBJECT") {
					index[fdir][our_name].vars.push(symbol.alias);
				}
			}
			//make the objects frame
			var output = obj_template.process(index[fdir][our_name]);
			IO.saveFile(context.d, "_objs_" + our_name, output.trim());

			// make copy original source code with syntax hiliting
			var sourceFile = fileGroup.files[i].path;
			if (sourceFile) {
				var hiliter = new JsHilite(IO.readFile(sourceFile));
				IO.saveFile(context.d, "src"+our_name, hiliter.hilite());
				fileGroup.files[i].source = "src"+our_name;
			}
			var output = file_template.process(fileGroup.files[i]);
			IO.saveFile(context.d, our_name, output.trim());
		}
	}
	var indx_template = new JsPlate(context.t+"index.tmpl");
	var index = indx_template.process(index);
	if (context.d) {
		IO.saveFile(context.d, "file_list.htm", index);
		IO.copyFile(context.t+"index.html", context.d);
		IO.copyFile(context.t+"splash.htm", context.d);
		//copy static dirs and files
		dirs = ['images', 'css', 'js'];
		for (z=0; z < dirs.length; z++ ){
			indir = context.t + dirs[z];
			outdir = context.d + dirs[z];
			IO.makeDir(outdir);
			files = IO.ls(indir, 1);
			for (x=0; x < files.length; x++ ){
				IO.copyFile(files[x], outdir);
			}
		}
	}
}
