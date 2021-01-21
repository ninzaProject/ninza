import consumer from "./consumer"

// 로그인을 하면 이 구독자가 된다.
export function connectSideBarChannel() {
  return consumer.subscriptions.create("SideBarChannel", {
    connected() {
      console.log("Im connected")
      // Called when the subscription is ready for use on the server
    },

    disconnected() {
      console.log("DISCONNECTED!!!!!!!!!1")
      // Called when the subscription has been terminated by the server
    },

    received(data) {
      console.log(data);
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
