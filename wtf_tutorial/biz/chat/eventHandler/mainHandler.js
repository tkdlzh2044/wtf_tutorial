var chat = require('../model/chat');

exports.onConnectClient = (socket, io) => {
    console.log('클라이언트 접속');
	var joinRoom = null;
       
	socket.on('join', (data) => {
		joinRoom = data.roomname;
		socket.join(joinRoom);//클라이언트를 방에 넣기(방에입장)
		//socket.broadcast.to(joinRoom) --> joinRoom에 있는 접속자들에게만 이벤트 발생하기(나는제외)
		socket.broadcast.to(joinRoom).emit('joined', {nickname : data.nickname });
		//joinRoom에 있는 접속자들에게만 이벤트 발생하기(나 포함)
		//io.to(joinRoom).emit('joined',{nickname:data.nickname});
	});
       
	socket.on('sendMsg', (data) => {
        console.log('sendMsg eventHandle');
		io.to(joinRoom).emit('recMsg', data);//dsa
	});
       
	socket.on('leaveRoom', (data) => {
		//다른 방접속자들에게 방을 나갔음을 알리기
		io.to(joinRoom).emit('leaveRoom', data);//dsa
		console.log(data.roomname + "," + data.nickname);
		//방의 접속자명단에서 닉네임 제거하기
		chat.removeAttendants(data.roomname, data.nickname);
		//방나가기
		socket.leave(joinRoom);
		//소켓접속 끊기
		socket.disconnect();
	});
}; // end connect

