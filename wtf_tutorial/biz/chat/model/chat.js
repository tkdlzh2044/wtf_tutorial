var chat = {
	users : [],//접속자
	rooms : [],//방목록
    
	addUser : function(nickname){//접속자명단 추가하기
		this.users.push(nickname);
	},
    
	addRoom : function(roomname){//방만들기
		//attendants : 방에 입장한 참석자 명단
		this.rooms.push({roomname : roomname, attendants : [] });
	},
    
	joinRoom : function(roomname, nickname){ //방에 입장하기
		//입장하려는 방객체(방이름+참석자명단) 얻어오기
		var rooms = this.rooms.filter( (element) => {
			return roomname === element.roomname;//true가 리턴되면 해당 element를 배열에 추가한다.
			//추가된 배열을 rooms가 저장함
		});
		//입장하려는 방의 참석자명단에 닉네임추가하기
		rooms[0].attendants.push(nickname);
	},
    
	getAttendantsList : function(roomname){//방의 참석자명단 리턴
		//filter함수를 사용해서 this.rooms중 해당 방의 참석자명단을 리턴하는 코드 작성해 보기
		var room = this.rooms.filter( (element) => {
			return roomname === element.roomname;
		});
        
		return room[0].attendants;
	},
    
	hasUser : function(nickname){//사용중인 닉네임인지 검사
		var users = this.users.filter( (element) => {
			return nickname === element;
		});
        
		if(users.length > 0){
			return true;
		}else{
			return false;
		}
	},
    
	removeAttendants : function(roomname, nickname){//방의 참석자명단에서 닉네임 제거하기
		var rooms = this.rooms.filter( (element) => {//닉네임을 제거할 방객체 얻어오기
			return (element.roomname === roomname);
		});
        
		var att = rooms[0].attendants.filter((element) => {
			return element !== nickname;//nickname과 같지 않은 요소들만 추출해서 배열로 만들기
		});
        
		rooms[0].attendants = att;//nickname이 빠진 새로운 명단을 attendants에 넣기
	},
    
	getRoomList : function(){//전체 방목록 리턴
		var roomnames = this.rooms.map((element) => {
			return element.roomname;//map함수:리턴된 값(방이름)들을 배열로 만들어줌
		});
        
		return roomnames;
	}
};

module.exports = chat;