// extends.View {
//     listenTo('#chat-menu', renderChat);
// }

// function renderChat() {
//     window.app.router.navigate('#/render_chat');
// }
// HomeView ChatView GuildView GameView
// import { NavView, SideBarView, HomeView } from '../internal'
import { NavView, SideBarView } from '../internal'

export let AppView = Backbone.View.extend({
    el: '#app-view',

    initialize: function () {
        this.nav_view = new NavView();
        this.side_bar_view = new SideBarView();
        // this.app_view = new HomeView();
    }
});

