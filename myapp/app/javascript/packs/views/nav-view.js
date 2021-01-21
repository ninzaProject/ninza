import { fetchContainer } from '../helper';
import { app, router } from '../internal'

export let NavView = Backbone.View.extend({
  el: '#nav-view',

  // DOM 요소에 걸어 놓는
  events: {
    // 'click #chat': 'chatRender',
    'click a[data-nav-value]': 'routeToMainView',
    'click div[data-nav-value]': 'routeToMainView',
    'click a[data-sign-value]': 'routeToSignView'
  },

  initialize: function() {
    this.nav_value = null;
  },
  
  // 'data-nav-menu'
  routeToMainView: function(e) {
    if (sessionStorage.getItem('status') == 'play') {
      app.game_channel.unsubscribe();
      sessionStorage.setItem('status', 'online');
    }
    router.navigate('#/' + e.target.getAttribute("data-nav-value"));
  },

  routeToSignView: function(e) {
      router.navigate('#/' + e.target.getAttribute("data-sign-value"));
  }
})
