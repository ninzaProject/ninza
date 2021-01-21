import { router } from '../internal'

export let NavView = Backbone.View.extend({
    el: '#nav-view',

    // DOM 요소에 걸어 놓는
    events: {
        // 'click #chat': 'chatRender',
        'click a[data-nav-value]': 'routeToMainView',
        'click a[data-sign-value]': 'routeToSignView'
    },

    initialize: function() {
        // listenTo -> 이건 모델에 걸어놓는거
        if (isLoggedIn()) {
            console.log("logged in now!")
        } else {
            console.log("logged out now!")
        }
    },
    
    // 'data-nav-menu'
    routeToMainView: function(e) {
        router.navigate('#/' + e.target.getAttribute("data-nav-value"));
    },

    routeToSignView: function(e) {
        router.navigate('#/' + e.target.getAttribute("data-sign-value"));
    }
})
