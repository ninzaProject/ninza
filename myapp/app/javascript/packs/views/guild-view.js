import { Router } from '../internal'

export let GuildView = Backbone.View.extend({
    el: '#main-view',

    initialize: function() {
        this.$el.html('guild-view');
    },
})
