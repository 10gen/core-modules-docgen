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

		DBApiLayer db = DBProvider.get("kristina", "127.0.0.1", 27017);
                DBCollection collection = db.getCollection("doc");
                collection.save(obj);
	}

}
