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

import java.io.*;
import ed.js.*;
import ed.db.*;

public class JSDocToDB {

	public static void main(String[] args) throws IOException {
		String src;
		if(args.length == 0) {
			src = "/home/k/gitroot/corejs/ws/fb.js";
		}
		else {
			src = args[0];
			System.out.println("arg0: "+args[0]);
		}

		Process p = Runtime.getRuntime().exec("java -jar jsrun.jar app/run.js "+src+" -r -t=templates/json", null, new File("../core-modules/docgen/"));
                BufferedWriter in = new BufferedWriter(new OutputStreamWriter( p.getOutputStream()));
                in.close();

		BufferedReader out = new BufferedReader(new InputStreamReader( p.getInputStream()));
		String line2 = "";
		StringBuffer jsdoc = new StringBuffer();
		while ((line2 = out.readLine()) != null){
			jsdoc.append(line2);
		}

		BufferedReader err = new BufferedReader(new InputStreamReader( p.getErrorStream()));
		String line;
		while ((line = err.readLine()) != null) {
                    System.out.println(line);
                }

		try {
			p.waitFor();
		}
		catch(InterruptedException e) {
			e.printStackTrace();
		}
		System.out.println("exit: "+p.exitValue());

		JSObjectBase ss = new JSObjectBase();
		ss.set("symbolSet", jsdoc.toString());
		JSObjectBase obj = new JSObjectBase();
		obj.set("_index", ss);

		DBApiLayer db = DBProvider.get("admin", "127.0.0.1", 27017);
                DBCollection collection = db.getCollection("doc");
                collection.save(obj);
	}

}
