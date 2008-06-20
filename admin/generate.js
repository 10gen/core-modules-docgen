core.util.doc();

if(!Doc.admin) Doc.admin = {};

// Get java and js src and send their doc to the db
Doc.admin.toDB = function() {
    // clean out the doc db
    db.doc.remove({});

    // restock
    var js = db.doc.src.js.find();
    while(js.hasNext()) {
        var z = js.next();
        Util.Doc.JSToDb(z.filename);
    }

    var java = db.doc.src.java.find();
    while(java.hasNext()) {
        var z = java.next();
        Util.Doc.JavadocToDb(z.filename);
    }
}

Doc.admin.toHTML = function(out_dir) {
    Util.Doc.DbToHTML(out_dir);
}

Doc.admin.all = function(out_dir) {
    this.toDB();
    this.toHTML(out_dir);
}
