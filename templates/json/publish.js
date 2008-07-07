IO.include("../templates/json/json2.js");

function publish(symbolSet) {
    print(divvyUp(removeJunk(symbolSet._index)));
//    IO.saveFile("/home/k/", "cleanOutput", JSON.stringify(removeJunk(symbolSet._index), null, 4));
}

function divvyUp(ss) {
    var arr = [];
    for(var cls in ss) {
        arr.push("{\""+cls+"\":"+JSON.stringify(ss[cls])+"}");
    }
    return arr.join("---=---");
}


function removeJunk(ss) {
    for(var cls in ss) {
        if(ss[cls]["$args"])
            delete ss[cls]["$args"];
        ss[cls].comment = {};
        ss[cls].params = ss[cls]._params;
        for(var m in ss[cls].methods) {
            if(ss[cls].methods[m]["$args"]) {
                delete ss[cls].methods[m]["$args"];
            }
            ss[cls].methods[m].comment = {};
            ss[cls].methods[m].params = ss[cls].methods[m]._params;
        }
        for(var p in ss[cls].properties) {
            if(ss[cls].properties[p]["$args"])
                delete ss[cls].properties[p]["$args"];
            ss[cls].properties[p].comment = {};
        }
    }
    return ss;
}
