var path = require('path');
var chat = require(path.join(__rootPath, 'biz', 'chat', 'model', 'chat'));

var chatViewPath = path.join(__rootPath, 'biz', 'chat', 'views');

//var users:[];//접속자
//var rooms:[];//방목록

exports.index = (req, res) => {
    res.render( path.join(chatViewPath, 'index'), {
        title: "MY HOMEPAGE",
        length: 5
    });
}; // end index

exports.enter = (req, res) => {
	var nickname = req.session.nickname;
	var roomlist = chat.getRoomList();
    var renderView = path.join(chatViewPath, 'enter');
    
	res.render(renderView, { title: 'enter', nickname : nickname, roomlist : roomlist});
}; // end enter

exports.postEndter = (req, res) => {    
	//사용자가 입력한 이름을 세션에 저장하기
	var nickname = req.body.nickname;
	req.session.nickname = nickname;
	//전체 방목록 얻어오기
    
    console.log("1");
	var roomlist = chat.getRoomList();
    console.log("2");
    
	//전체 참석자명단에 닉네임 추가하기
	chat.addUser(nickname);
	
    var renderView = path.join(chatViewPath, 'enter');
    
	res.render(renderView, { title: 'enter', nickname : nickname, roomlist : roomlist});
}; // end postEndter

exports.makeroom = (req, res) =>{
	//방이름 얻어오기
	var roomname = req.body.roomname;
    
	var nickname = req.session.nickname;
	//방만들기
	chat.addRoom(roomname);
	//방에 입장하기
	chat.joinRoom(roomname, nickname);
	//참성자 명단 가져오기
	var attendants = chat.getAttendantsList(roomname);
    
    var renderView = path.join(chatViewPath, 'join');
    
	res.render(renderView, {title: 'join', nickname : nickname, roomname : roomname, attendants : attendants});
}; // end postEndter

exports.joinRoom = (req, res) =>{
	var roomname = req.params.roomname;
    
	var nickname = req.session.nickname;
    
	//해당방에 입장하기
	chat.joinRoom(roomname, nickname);
    
	var attendants = chat.getAttendantsList(roomname);
    
    var renderView = path.join(chatViewPath, 'join');
    
	res.render(renderView, {title: 'join', nickname : nickname, roomname : roomname, attendants : attendants});
}; // end joinRoom


