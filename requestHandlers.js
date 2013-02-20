var responseTemplate = require("./responseTemplate");
var querystring = require("querystring");
var fs = require('fs');

function start(response, postData) {
	fs.readFile('./pages/start.html', function (err, html) {
	    if (err) {
	        throw err; 
	    }       
	    responseTemplate.responseTemplate(response, 200, html, "text/html");
	});
}

function chat(response, postData) {
	fs.readFile('./pages/chat.html', function (err, html) {
	    if (err) {
	        throw err; 
	    }
	    var firstName = "<input type=hidden id='hidName' name='hidName' value='"+ querystring.parse(postData).firstname +"' />";
	    responseTemplate.responseTemplate(response, 200, html + firstName, "text/html");
	});
	//responseTemplate.responseTemplate(response, 200, "You've sent: " + querystring.parse(postData).firstname, "text/plain");
}

exports.start = start;
exports.chat = chat;