import { Router } from '../internal'

export let HomeView = Backbone.View.extend({
    initialize: function() {
        this.$el.html('home-view');
        $('#main-view').html(this.$el);
    },
})
