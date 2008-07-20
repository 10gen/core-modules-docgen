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

/** @namespace */
Opt = {
	/**
	 * Get commandline option values.
	 * @param {Array} args Commandline arguments. Like ["-a=xml", "-b", "--class=new", "--debug"]
	 * @param {object} optNames Map short names to long names. Like {a:"accept", b:"backtrace", c:"class", d:"debug"}.
	 * @return {object} Short names and values. Like {a:"xml", b:true, c:"new", d:true}
	 */
	get: function(args, optNames) {
		var opt = {"_": []}; // the unnamed option allows multiple values
		for (var i = 0; i < args.length; i++) {
		    var arg = new String(args[i]);
		    var name;
		    var value;
                    if(arg == "--") { //end of opts, take the rest of the line as input
                        opt.b = args[++i];
                        continue;
                    }
		    else if (arg.charAt(0) == "-") {
				if (arg.charAt(1) == "-") { // it's a longname like --foo
					arg = arg.substring(2);
					var m = arg.split("=");
					name = m.shift();
					value = m.shift();
					if (typeof value == "undefined") value = true;

					for (var n in optNames) { // convert it to a shortname
						if (name == optNames[n]) {
							name = n;
						}
					}
				}
				else { // it's a shortname like -f
					arg = arg.substring(1);
					var m = arg.split("=");
					name = m.shift();
					value = m.shift();
					if (typeof value == "undefined") value = true;

					for (var n in optNames) { // find the matching key
						if (name == n || name+'[]' == n) {
							name = n;
							break;
						}
					}
				}
				if (name.match(/(.+)\[\]$/)) { // it's an array type like n[]
					name = RegExp.$1;
					if (!opt[name]) opt[name] = [];
				}

				if (opt[name] && opt[name].push) {
					opt[name].push(value);
				}
				else {
					opt[name] = value;
				}
			}
			else { // not associated with any optname
				opt._.push(args[i]);
			}
		}
		return opt;
	}
}

/*t:
	plan(11, "Testing Opt.");

	is(
		typeof Opt,
		"object",
		"Opt is an object."
	);

	is(
		typeof Opt.get,
		"function",
		"Opt.get is a function."
	);

	var optNames = {a:"accept", b:"backtrace", c:"class", d:"debug", "e[]":"exceptions"};
	var t_options = Opt.get(["-a=xml", "-b", "--class=new", "--debug", "-e=one", "-e=two", "foo", "bar"], optNames);

	is(
		t_options.a,
		"xml",
		"an option defined with a short name can be accessed by its short name."
	);

	is(
		t_options.b,
		true,
		"an option defined with a short name and no value are true."
	);

	is(
		t_options.c,
		"new",
		"an option defined with a long name can be accessed by its short name."
	);

	is(
		t_options.d,
		true,
		"an option defined with a long name and no value are true."
	);

	is(
		typeof t_options.e,
		"object",
		"an option that can accept multiple values is defined."
	);

	is(
		t_options.e.length,
		2,
		"an option that can accept multiple values can have more than one value."
	);

	is(
		t_options.e[1],
		"two",
		"an option that can accept multiple values can be accessed as an array."
	);

	is(
		typeof t_options._,
		"object",
		"the property '_' is defined for unnamed options."
	);

	is(
		t_options._[0],
		"foo",
		"the property '_' can be accessed as an array."
	);
 */
