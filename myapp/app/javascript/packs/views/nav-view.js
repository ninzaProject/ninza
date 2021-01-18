import { router } from '../internal'

export let NavView = Backbone.View.extend({
    el: '#nav-view',

    // DOM 요소에 걸어 놓는
    events: {
        // 'click #chat': 'chatRender',
        'click a[data-nav-value]': 'routeToMainView'
    },

    initialize: function() {
        // listenTo -> 이건 모델에 걸어놓는거
    },
    // 'data-nav-menu'
    routeToMainView: function(e) {
        router.navigate('#/' + e.target.getAttribute("data-nav-value"));
    }
})
