//   defaults: {
//       type: 'guest', // 로그인하면 user, admin이면 admin
//   },
// SPA: 프론트엔드에서 새로 페이지 전체를 렌더링하지 않으면 된다?
// 회원가입시 form 작성하면 RESTful하게 서버에 data{id, password, 2차인증설정 여부, social_인증 }를 넘겨준다.
// server인 rails가 이걸받아서, validation 체크를 하고 postgresql에 저장하고,
// 정상처리되었다고 클라이언트에게 응답하면서, 클라이언트가 유저 객체를 만드는데 필요한 정보들만 따로 담아서 넘겨준다. 그리고 그 안에 비번은 포함되어있을 필요가 없다.
//   클라이언트는 서버로부터 필요한 데이터를 쏙쏙 꺼내서 user 객체를 만든다.
// Home 화면이 똭!

//   url: 'users/' + this.id,
// GUEST로 입장했을 때 모델을 만들ㅇ것인가 말 것인가
// 로그인을 하는 순간 만들었으면 좋겠다. 가 저의 의견.
export let User = Backbone.Model.extend({
  initialize: function(data) {
    // console.log("New model " + data['id']);
    this.id = data['id'];
    this.type = data['type']; // service owner, web admin, normal_user
    // this.email = data['email'];
    this.status = data['status'];  // 접속 여부, 게임 중
    // this.guild = data['guild'];
    // this.ladder_score = data['ladder_score'];
},
});
