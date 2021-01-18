// import { NavView } from "./views/nav-view";
import { HomeView, ChatView, GuildView, GameView } from './internal'

let Router = Backbone.Router.extend({
  routes: {
    '': 'callHomeView',
    'home' : 'callHomeView',
    'chat' : 'callChatView',
    'guild' : 'callGuildView',
    'game' : 'callGameView'
  },

  // 아래 callXXXXView 들은 main 페이지의 종류
  callHomeView: function() {
    view = new HomeView();
    this.render(view);
  },

  callChatView: function() {
    view = new ChatView();
    this.render(view);
  },

  callGuildView: function() {
    view = new GuildView();
    this.render(view);
  },

  callGameView: function() {
    view = new GameView();
    this.render(view);
  },

  render: function (view) {
    //Close the current view
    if (this.currentView) {
        this.currentView.remove();
    }

    //render the new view
    view.render();

    //Set the current view
    this.currentView = view;

    return this;
  }
});

export let router = new Router();


// TODO안에서 TODO를 필터링할 때,이미 클라이언트가 가져와있는 투두들을 렌더링하는 게 바뀌는 것. <-- 채팅창에서 채팅이 만들어지고 삭제될 때 그 때 routing하면, 채팅창 콜렉션이 변경되는 것을 여기서 트리거함.


