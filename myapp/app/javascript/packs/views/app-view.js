// extends.View {
//     listenTo('#chat-menu', renderChat);
// }

// function renderChat() {
//     window.app.router.navigate('#/render_chat');
// }
// HomeView ChatView GuildView GameView
// import { NavView, SideBarView, HomeView } from '../internal'
import { NavView, SideBarView, app } from '../internal'

// let app = app || {};

// let view = view || {}

export let AppView = Backbone.View.extend({
// app.AppView = Backbone.View.extend({
  el: '#app-view',

  initialize: function () {
    this.nav_view = new NavView();
    app.nav_view = this.nav_view;
    this.side_bar_view = new SideBarView();
    app.side_bar_view = this.side_bar_view;
    // this.app_view = new HomeView();
  }
});
