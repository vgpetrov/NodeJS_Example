var server = require("./server");
var router = require("./router");
var handleMapping = require("./handleMapping");

server.start(router.route, handleMapping.handleMapping());