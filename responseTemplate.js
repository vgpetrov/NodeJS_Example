function responseTemplate(response, statusVal, message, contentType) {
	response.writeHead(statusVal, {"Content-Type": contentType});
	response.write(message);
	response.end();
}

exports.responseTemplate = responseTemplate