var requestHandlers = require("./requestHandlers");

function handleMapping() {
	var handle = {
    	"/" : requestHandlers.start,
    	"/start" : requestHandlers.start,
    	"/chat" : requestHandlers.chat
	}
	return handle;
}

exports.handleMapping = handleMapping;