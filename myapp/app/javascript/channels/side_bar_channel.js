import consumer from "./consumer"
import { app, User } from "../packs/internal"

// 로그인을 하면 이 구독자가 된다.
export function connectSideBarChannel() {
  return consumer.subscriptions.create("SideBarChannel", {
    connected() {
      console.log("Im connected")
      // Called when the subscription is ready for use on the server
    },

    disconnected() {
      console.log("DISCONNECTED!!!!!!!!!")
      // consumer.subscriptions.remove();
      // Called when the subscription has been terminated by the server
    },

    received(data) {
      // online 이면 유저가 새롭게 추가된 상황
      // offline이면 유저가 로그아웃한 상황
      // game 이면 유저가 게임중인 상황
      // 새로운 유저가 로그인 한 상황
      // 1. 리스트에 있는지 확인하고 status 를 확인한다
      // 2. status가 offline 이면 컬렉션에서 모델을 삭제한다.
      // 3. status가 online 이면 컬렉션에서 모델을 추가한다.
      // 게임은 이후에 추가해주자.

      if (data.status == "online") {
        if (app.side_bar_view.user_list.where({id: data.id}) == "") {
          app.side_bar_view.user_list.add(new User(data));
        }
      }
      else if (data.status == "offline") {
          console.log("off add list")
          app.side_bar_view.user_list.remove(app.side_bar_view.user_list.where({id: data.id}));
      }
      else {
        console.log("GAME!!!");
      }

      // console.log(app.side_bar_view.user_list.where({id: data.id}));
      // console.log(app.side_bar_view.user_list.where({id: -1}));

      // console.log(app.side_bar_view.user_list.where({id: 1}));
      // if (app.side_bar_view.userlist)
      // 1. 컬렉션에 모델을 추가해준다. -> model User, collection Users
      // 2. collection -> add 에 이벤트를 걸어야 한다(remove 포함)
      // 3. add listen에서는
      //  렌더링 한번 더해준다.
      // Called when there's incoming data on the websocket for this channel
    }
  });
}

// export default connectSideBarChannel;

// 원흉을 찾아 제거하자.
// consumer.subscriptions.create 이 자체가 문제다
// application에서 한번 ~~서 한번 -> 두번
// webpacker은 모듈형
// 따라서 실행이 되지 않기 묶어줘야한다.

// 쿠키를 이용해서 로그인했으면 아이디가 있을텐데, 비어있지 않거나
// 한층 더 강한 보안?
// identifiers 이 녀석을 이용해서 액션케이블을 조작하는 방법이 있다.
// 로그인을 성공하는 순간
