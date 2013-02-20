var io = require('socket.io').listen(8125);
var userList = [];
// Отключаем вывод полного лога - пригодится в production'е
io.set('log level', 1);
// Навешиваем обработчик на подключение нового клиента
io.sockets.on('connection', function (socket) {
	// Т.к. чат простой - в качестве ников пока используем первые 5 символов от ID сокета
	var ID = (socket.id).toString().substr(0, 5);
	var time = (new Date).toLocaleTimeString();
	// Посылаем клиенту сообщение о том, что он успешно подключился и его имя
	//socket.json.send({'event': 'connected', 'id' : ID ,'name': ID, 'time': time});
	// Посылаем всем остальным пользователям, что подключился новый клиент и его имя
	//socket.broadcast.json.send({'event': 'userJoined', 'id' : ID , 'name': ID, 'time': time});
	// Навешиваем обработчик на входящее сообщение
	var firstname = "";
	socket.on('message', function (msg) {
		var time = (new Date).toLocaleTimeString();
		if(msg.substring(0,5)=="name=") {
			firstname = msg.substring(5);
			socket.json.send({'event': 'connected', 'id' : ID ,'name': firstname=="undefined"?ID:firstname, 'time': time});
			socket.broadcast.json.send({'event': 'userJoined', 'id' : ID , 'name': firstname=="undefined"?ID:firstname, 'time': time});
		}else {
			// Уведомляем клиента, что его сообщение успешно дошло до сервера
			socket.json.send({'event': 'messageSent', 'id' : ID , 'name': firstname==""||firstname=="undefined"?ID:firstname, 'text': msg, 'time': time});
			// Отсылаем сообщение остальным участникам чата
			socket.broadcast.json.send({'event': 'messageReceived', 'id' : ID , 'name': firstname==""||firstname=="undefined"?ID:firstname, 'text': msg, 'time': time});
		}
	});
	// При отключении клиента - уведомляем остальных
	socket.on('disconnect', function() {
		var time = (new Date).toLocaleTimeString();
		io.sockets.json.send({'event': 'userSplit', 'id' : ID , 'name': firstname==""||firstname=="undefined"?ID:firstname, 'time': time});
	});
});