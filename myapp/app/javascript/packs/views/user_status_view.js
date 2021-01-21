

export let UserStatusView = Backbone.View.extend({
   //인자로 model이 들어온다.
    tagName: 'li',
    template: _.template($('#user-status-view').html()),
    initialize: function() {
        this.intra_id = this.model.attributes.intra_id;
        this.status = this.model.attributes.status;
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON())); // 훔..
      return this;
    }
});
