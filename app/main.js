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
 * @version $Id: main.js 570 2008-04-07 23:54:50Z micmath $
 */

function main() {
	IO.include("lib/JSDOC.js");
	IO.includeDir("plugins/");

	if (JSDOC.opt.v) LOG.verbose = true;
	if (JSDOC.opt.o) LOG.out = IO.open(JSDOC.opt.o);

	if (JSDOC.opt.T) {
		LOG.inform("JsDoc Toolkit running in test mode at "+new Date()+".");
		IO.include("frame/Testrun.js");
		IO.include("test.js");
	}
	else {
	    LOG.inform("JsDoc Toolkit main() running at "+new Date()+".");
	    LOG.inform("With options: ");
	    for (var o in JSDOC.opt) {
		LOG.inform("    "+o+": "+JSDOC.opt[o]);
	    }

            if(JSDOC.opt.b) {
                LOG.inform("Using existing JSON: "+JSDOC.opt.b);
                var jsdoc = eval("("+JSDOC.opt.b+")");
            }
            else {
		var jsdoc = new JSDOC.JsDoc();
	    }

		if (JSDOC.opt.Z) { // secret debugging option
			LOG.warn("So you want to see the data structure, eh? This might hang if you have circular refs...");
			IO.include("frame/Dumper.js");
			var symbols = jsdoc.symbolSet.toArray();
			for (var i = 0, l = symbols.length; i < l; i++) {
				var symbol = symbols[i];
				print("// symbol: " + symbol.alias);
				print(symbol.serialize());
			}
		}
		else {
			var template = JSDOC.opt.t || System.getProperty("jsdoc.template.dir");

			var handler = jsdoc.symbolSet.handler;
			if (handler && handler.publish) {
				handler.publish(jsdoc.symbolSet);
			}
			else {
				if (typeof template != "undefined") {
					try {
						load(template+"/publish.js");
						if (!publish) {
							LOG.warn("No publish() function is defined in that template so nothing to do.");
						}
						else {
							publish(jsdoc.symbolSet);
						}
					}
					catch(e) {
						LOG.warn("Sorry, that doesn't seem to be a valid template: "+template+"/publish.js : "+e);
					}
				}
				else {
					LOG.warn("No template or handlers given. Might as well read the usage notes.");
					JSDOC.usage();
				}
			}
		}
	}
/*
	if (LOG.warnings.length) {
		print(LOG.warnings.length+" warning"+(LOG.warnings.length != 1? "s":"")+".");
	}
*/
	if (LOG.out) {
		LOG.out.flush();
		LOG.out.close();
	}
}
