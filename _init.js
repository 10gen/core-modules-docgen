/*
 *  Docgen App Module
 */

Doc = {};


/**
 *   options for this usage.  Set in docgen.install.js
 */
Doc._options = {};


/**
 *  Returns the routes object for docgen.  Used by apps to set routing delegation.
 */
Doc.getRoutes = function() {
	return Doc.routes;
}

/*
 *  set up default routing to the docgen index page to do standard docgen presentation
 */
core.core.routes();
Doc.routes = new Routes();
Doc.routes.add( /assets\/.*\.(js|css|jpg|gif|jpeg|png|ico)$/ , "/~~/modules/docgen/apidocs/$0" );
Doc.routes.setDefault("/~~/modules/docgen/apidocs/index.jxp");
