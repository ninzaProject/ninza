import { fetchContainer } from '../helper';
import { Router } from '../internal'

export let GuildFormView = Backbone.View.extend({
  template: _.template($("#create-guild").html()),
  el: "#main-view",

  events: {
    "click .ui.guild_form.button": "createGuild"
  },

  initialize: function() {
    console.log("GuildFormView created!");
    this.input = ".guild-form-input";
    this.data = {"name": {}};
  },

  render: function() {
    this.$el.html(this.template())
    return this;
  },

  createGuild: function() {
    this.data['name'] = $(this.input).val();
    fetchContainer('/guild/create', 'POST', this.data).then(function(result) {
      if (result.hasOwnProperty('guild')) {
        console.log(result);
      } else {
        console.log(result.errors.message);
      }
    });
  },
})