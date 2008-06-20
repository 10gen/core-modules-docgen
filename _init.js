/*
 *  Docgen App Module
 */

Doc = {};

/*
 *  initialize djang10 framework and add our default templates
 */
djang10.addTemplateRoot(core.modules.docgen.djang10);

/**
 *   options for this usage.  Set in docgen.install.js
 */
Doc._options = {};


/**
 *  Adds a directory for templates to the search path.
 *  @param {path object} root path to search (ex. __path__.docgen.templates)
 */
Doc.addTemplateRoot = function(root) {
	djang10.addTemplateRoot(root);
}

/**
 *  Returns the routes object for docgen.  Used by apps to set routing delegation.
 */
Doc.getRoutes = function() {
	return Doc.routes;
}

/**
 *   Finds a template.  Searches the _templatesRoots array starting at the beginning
 *   @param {string} templateName name of template to find.  Do not include extension
 */
Doc.getTemplate = function(templateName) {
	return djang10.loadTemplate(templateName);
}

/*
 *  set up default routing to the docgen index page to do standard docgen presentation
 */
core.core.routes();
Doc.routes = new Routes();
Doc.routes.setDefault("/~~/modules/docgen/admin/index.jxp");
