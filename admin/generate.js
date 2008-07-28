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

core.util.doc();

if(!Doc.admin) Doc.admin = {};

// Get java and js src and send their doc to the db
Doc.admin.toDB = function() {
    if(Util.Doc.inProgress) {
        return "in progress";
    }
    Util.Doc.initialize();

    // clean out the doc collections
    db.doc.code.drop();
    db.doc.drop();

    // restock
    var src = db.doc.src.find();
    while(src.hasNext()) {
        var z = src.next();
        Util.Doc.srcToDb(z.filename);
    }
    Util.Doc.javaSrcsToDb();
}

Doc.admin.toHTML = function(out_dir) {
    if(Util.Doc.inProgress) {
        return "in progress";
    }
    Util.Doc.dbToHTML(out_dir);
}

Doc.admin.all = function(out_dir) {
    if(Util.Doc.inProgress) {
        return "in progress";
    }
    this.toDB();
    this.toHTML(out_dir);
}
