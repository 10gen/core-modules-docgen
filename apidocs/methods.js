
Methods = {

    getArrayLinks : function( array ) {
        return array.sort().map( function($) { return Methods.linkToSymbol($); } ).join(", ");
    },

    linkToSymbol : function( symbol, pretty ) {
        var name = Methods.getName( symbol );
        if( !pretty ) {
            if( symbol.alias )
                pretty = symbol.alias;
            else
                pretty = name; 
        }
        return '<a href="'+name+'">'+pretty+'</a>';
    },

    makeSignature : function( symbol ) {
        var params;
        if( symbol.params )
            params = symbol.params;
        else 
            params = symbol._params;

        return "("+params.map( function($) { return " "+$.type+" "+$.name+" "; } ).join(", ")+")";
    },

    makeSrcLink : function( code ) {
        link = code.replace( /\//g, "." );
        return '<a href="code='+link+'">'+code+'</a>';
    },

    getBorrowers : function( array ) {
       return array.filter(function($) {return $.memberOf != data.alias});
    },

    getUnique : function( array, field ) {
        u = [];
        array.map(function($) {
            if (u.indexOf ($[field] ) < 0) 
                u.push( $[field] )
        });
        return u;
    },

    filterEqual : function( array, field, val ) {
        array.filter(function($) { return $[field] == val });
    },

    filterNot : function( array, field ) {
        return array.filter(function($){return !$.isNamespace; } );
    },

    anonClassLink : function( alias, symbol ) {
        var name = Methods.getName( symbol );
        return '<a href="'+alias+"#"+name+'">'+name+'</a>';
    },

    relativeLink : function( symbol, text, num ) {
        var name = Methods.getName( symbol );
        var alias = symbol.alias ? symbol.alias : name;
        var anchor = text ? ( num ? text+num : text ) : name;
        return '<a href="'+alias+"#"+anchor+'">'+name+'</a>';
    },

    linkAnchor : function( symbol, text, num ) {
        var name = Methods.getName( symbol );
        var anchor = text ? ( num ? text+num : text ) : name;
        return '<a name="'+anchor+'"/>';
    },

    resolveLinks : function( text ) {
        return text;
    },

    summarize : function( text ) {
        return text.substring(0, text.indexOf(". "));
    },

    getName : function( symbol ) {
        var name;
        if( symbol.name ) 
            name = symbol.name;
        else if( symbol._name )
            name = symbol._name;
        else 
            name = symbol;
        return name;
    }
}
