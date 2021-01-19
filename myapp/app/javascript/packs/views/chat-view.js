import { Router } from '../internal'

export let ChatView = Backbone.View.extend({

    initialize: function() {
        this.$el.html('chat-view');
        $('#main-view').html(this.$el);
    },
})
