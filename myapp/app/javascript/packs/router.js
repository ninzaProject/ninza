// import { NavView } from "./views/nav-view";
import { fetchContainer, hideModal } from './helper';
import { SigninView, SignupView, HomeView, ChatView, GuildView, LadderGameView } from './internal'

let Router = Backbone.Router.extend({
  routes: {
    '': 'callHomeView',
    'home' : 'callHomeView',
    'chat' : 'callChatView',
    'guild' : 'callGuildView',
    'ladderGame' : 'callLadderGameView',
    'signup': 'callSignupView',
    'signin': 'callSigninView',
    'logout': 'callLogoutView'
  },

  // 아래 callXXXXView 들은 main 페이지의 종류
  callHomeView: function() {
    this.renderMainView(new HomeView());
  },

  callChatView: function() {
    if (isLoggedIn()) {
      this.renderMainView(new ChatView());
    }
    else
      this.renderModalView(new SigninView());
  },

  callGuildView: function() {
    if (isLoggedIn())
      this.renderMainView(new GuildView());
    else
      this.renderModalView(new SigninView());
  },

  callLadderGameView: function() {
    if (isLoggedIn())
      this.renderMainView(new LadderGameView());
    else
      this.renderModalView(new SigninView());
  },

  callSignupView: function() {
    this.renderModalView(new SignupView());
  },

  callSigninView: function() {
    this.renderModalView(new SigninView());
  },

  callLogoutView: function() {
    sessionStorage.removeItem('status');
    fetchContainer('/users/logout');
    resetSignButton();
    this.renderMainView(new HomeView());
  },

  renderMainView: function (view) {
    if (this.currentMainView) {
      this.currentMainView.remove();
    }
    view.render();
    this.currentMainView = view;
    return this;
  },

  renderModalView: function (view) {
    if (this.currentModalView) {
      this.currentModalView.remove();
    }
    view.render();
    this.currentModalView = view;
    return this;
  }
});

function resetSignButton() {
  $('a[data-sign-value=signin]').removeClass('invisible');
  $('a[data-sign-value=signup]').removeClass('invisible');
  $('a[data-sign-value=logout]').addClass('invisible');
}

export let router = new Router();


// TODO안에서 TODO를 필터링할 때,이미 클라이언트가 가져와있는 투두들을 렌더링하는 게 바뀌는 것. <-- 채팅창에서 채팅이 만들어지고 삭제될 때 그 때 routing하면, 채팅창 콜렉션이 변경되는 것을 여기서 트리거함.


