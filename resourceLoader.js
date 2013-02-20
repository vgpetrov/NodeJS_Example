var responseTemplate = require("./responseTemplate");
var fs = require('fs');

function resourceLoad(resource, response) {
	fs.readFile('.' + resource, function (err, html) {
	    if (err) {
	        throw err; 
	    }       
	    responseTemplate.responseTemplate(response, 200, html, "image/jpeg");
	});
}

exports.resourceLoad = resourceLoad;