var responseTemplate = require("./responseTemplate");
var resourceLoader = require("./resourceLoader");

function route(handle, pathname, response, postData) {
	console.log("About to route a request for " + pathname);
  	if (typeof handle[pathname] === 'function') {
    	return handle[pathname](response, postData);
  	} else {
    	var jpgPattern = new RegExp(".jpg");
    	if(jpgPattern.test(pathname)){
    		resourceLoader.resourceLoad(pathname, response);
    	}else {
    		console.log("No request handler found for " + pathname);
    		responseTemplate.responseTemplate(response, 404, "404 Not found", "text/plain");
    	}
  	}	
}

exports.route = route;