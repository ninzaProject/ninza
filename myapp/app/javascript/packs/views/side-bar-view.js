import { Router } from '../internal'
import { Users } from '../internal'
import { User } from '../internal'
import { UserStatusView } from '../internal'


// 생성과 동시에 딱 한번만 new로 만들자.
// 어느  시점에 만들지?
//   클라이언트가 웹에 접속하는 순간 바로 생성
// 게스트는 현재 접송중인 유저를 보지 못한다. 즉 user_list가 생성되지 않은 상태
// 그러면 언제 user_list 를 만들지?
//    로그인 하는 순간 user_list 를 만든다 -> signin-view.js 파일에 SideBarView를 includee 하
// side_bar_view 파일에서
//   const SideBarView = {};
//   SideBarBiew.side_bar_view = Backbone.View ....
//   SideBarView.users = new SideBarView.side_bar_view();
// 이 녀석만 전역화 해서 사용한다.


export let SideBarView = Backbone.View.extend({
  el: '#side-bar-view',

  initialize: function() {
    this.user_list = new Users();
  },

  makeUserList: function() {
  let obj = this;
  this.resetSideBar();
  fetchContainer('/users/logined_user_list')
  .then(function(result) {
    for (let user of result.list) {
    let user_model = new User(user);
    obj.user_list.add(user_model);
    }
  })
  .then(function() {
    for (let user of obj.user_list) {
    let user_status_view = new UserStatusView({model: user})
    obj.$el.children().append(user_status_view.render().$el);
    }
  });
  },

  resetSideBar: function() {
    this.user_list.reset();
    this.$el.children().children().remove();
  }
})
