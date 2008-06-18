IO.include("../templates/json/json2.js");

function publish(symbolSet) {
    print(JSON.stringify(removeJunk(symbolSet._index)));
}

function removeJunk(ss) {
    for(var cls in ss) {
        if(ss[cls]["$args"])
            delete ss[cls]["$args"];
        ss[cls].comment = {};
        for(var m in ss[cls].methods) {
            if(ss[cls].methods[m]["$args"]) {
                delete ss[cls].methods[m]["$args"];
            }
            ss[cls].methods[m].comment = {};
        }
        for(var p in ss[cls].properties) {
            if(ss[cls].properties[p]["$args"])
                delete ss[cls].properties[p]["$args"];
            ss[cls].properties[p].comment = {};
        }
    }
    return ss;
}
