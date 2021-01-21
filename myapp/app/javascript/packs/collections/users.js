import { User } from '../internal'

// side-bar-view -> 컬렉션
//   li-view -> 모델
export let Users = Backbone.Collection.extend({
  url: '/users/logined_user_list',
  model: User,

});

    // 서버에서 모든 로그인 유저를 가져오는 api가 없다.
    // fetch('url') 를 통해서 JSON 형식으로 로그인되어있는 모든 유저목록을 가져와야함.

    // 서버에서 로그인해있는 모든 유저 정보를 가져온다.
    // 이걸 반복문을 통해서 각각을 모델로 만든다.
    // 지금 현재 접속해 있는 모든 유저 리스트를 모델로 만들고 여기에 추가해주는 작업.
    // 로그인이 안되어있으면 이걸 어떻게 해주지? GUEST 는 어떻게 컬렉션에서 관리를 해주지?
    // 세션에 접속한 순간 바로 모델로 만든다?
  // E 가 로그인 하는 순간 서버에 speak 으로 나 로그인했어 라고 알려준다.
  // 서버에서는 이 메세지를 받고, 로그인 한 모든 유저(구독자) 들한테 브로드캐스팅으로 현재 누구누구가 로그인 했어~
  // `received` 에서 이 정보를 받는다.
  // collection을 동적으로 관리한다.
