core.util.doc();

if(!Doc.admin) Doc.admin = {};

// Get java and js src and send their doc to the db
Doc.admin.toDB = function(version) {
    Util.Doc.setVersion(version);

    // clean out the doc collections
    db.doc.code.drop();
    db.doc.remove({version : version});

    // restock
    var src = db.doc.src.find({version : version});
    while(src.hasNext()) {
        var z = src.next();
        Util.Doc.srcToDb(z.filename);
    }
    Util.Doc.javaSrcsToDb();
}

Doc.admin.toHTML = function(out_dir, version) {
    Util.Doc.dbToHTML(out_dir, version);
}

Doc.admin.all = function(out_dir, version) {
    this.toDB(version);
    this.toHTML(out_dir, version);
}
