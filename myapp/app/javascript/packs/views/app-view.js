import { NavView, SideBarView, app , SigninView, SignupView } from '../internal'

export let AppView = Backbone.View.extend({
  el: '#app-view',

  initialize: function () {
    window.aaa = app;
    this.nav_view = new NavView();
    this.side_bar_view = new SideBarView();

    app.nav_view = this.nav_view;
    app.side_bar_view = this.side_bar_view;
    app.signin_view = new SigninView();
    app.signup_view = new SignupView();
  }
});
