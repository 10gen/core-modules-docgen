core.util.doc();

if(!Doc.admin) Doc.admin = {};

// Get java and js src and send their doc to the db
Doc.admin.toDB = function(version) {
    Util.Doc.setVersion(version);

    // clean out the doc db
    db.doc.remove({version : version});

    // restock
    var js = db.doc.src.js.find({version : version});
    while(js.hasNext()) {
        var z = js.next();
        Util.Doc.JSToDb(z.filename);
    }

    var java = db.doc.src.java.find({version : version});
    while(java.hasNext()) {
        var z = java.next();
        Util.Doc.JavadocToDb(z.filename);
    }
}

Doc.admin.toHTML = function(out_dir, version) {
    Util.Doc.DbToHTML(out_dir, version);
}

Doc.admin.all = function(out_dir, version) {
    this.toDB(version);
    this.toHTML(out_dir, version);
}
