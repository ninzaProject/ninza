import { Router } from '../internal'

export let GameView = Backbone.View.extend({
    el: '#main-view',

    initialize: function() {
        this.$el.html('game-view');
    },
})
