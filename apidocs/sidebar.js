
Sidebar = {};
Sidebar.pkgs = {};

// traverse the tree to print the classes
Sidebar.printSidebar = function(curPkg, curPath, indent) {
    for(var k in curPkg) {
        print('<div>');
        print('<a href="' + (curPath+k) +'" style="font-weight: normal; font-size: 100%; margin-left: '+ indent +'em;">' + k + '</a>');
        print('</div>');
        Sidebar.printSidebar(curPkg[k], curPath+k+".", indent+1);
    }
}


cursor = db.doc.find().sort({name:1});

var checkIfExists = function(h, idx) {
    while(h.length > idx+1) h.pop();
    var path = h.join(".");
    var obj = db.doc.findOne({name : path});
    // if there is not already an object with this name, create a placeholder
    if (obj == null) {
        obj = {
            _index : { symbolSet : {} },
            content : '<br /><div id="content"><h1 class="classTitle">'+path+'</h1><p class="description">There is no documentation for this package, yet.</p></div>',
            name : path,
            desc : "",
            ts: new Date(),
            version : null
        };
        db.doc.save(obj);
    }
}

var createHeirarchy = function( str, curPkg ) {
    var heirarchy = str.split(".");
    for(var i=0; i<heirarchy.length; i++) {
        if( !(heirarchy[i] in curPkg) ) {
            checkIfExists(Object.extend([], heirarchy), i);
            curPkg[heirarchy[i]] = {};
        }
        curPkg = curPkg[heirarchy[i]];
    }
    return curPkg;
}

// create a table based on the class heirarchy
cursor.forEach( function(blob) {
    var curPkg = Sidebar.pkgs;
    if( blob.packages && blob.packages.length > 0 ) {
        for( pkg in blob.packages ) {
            curPkg = createHeirarchy( blob.packages[pkg], curPkg );
            curPkg[ blob.alias ] = {};
        }
    }
    else {
        createHeirarchy( blob.name, curPkg );
    }
});


