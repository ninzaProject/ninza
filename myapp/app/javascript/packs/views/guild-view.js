import { router, GuildsView, GuildModel } from '../internal'

export let GuildView = Backbone.View.extend({
  template: _.template($("#guild-view").html()),
  tagName: "tr",

  initialize: function(data) {
    this.data = data;
    // this.$el.html('guild-view');
    // $('#tbody').html(this.$el);
  },

  render: function() {
    // guilds-view : 길드들 모아놓은 리스트, 랭킹
    // guild-view : 이름, 오피서, 사진, 이런거..
    this.$el.html(this.template(this.data));
    return this;
  }

  // initialize: function() {
  //   // this.render();
  //   this.render();
  // },
  // render: () => {
  //   this.$el.html(this.model.render());
  //   return this;
  // }
});

// let guild_users = new GuildUsers([
//   new GuildUsers({name: 'Gam'}),
//   new GuildUsers({name: 'Gun'}),
//   new GuildUsers({name: 'Gon'}),
//   new GuildUsers({name: 'Lee'})
// ])

// guild_users.add(new GuildUsers({name: 'Gam', users: 'Sanam'}));
// guild_users.add(new GuildUsers({name: 'Gam', users: 'Jujeong'}));
// guild_users.add(new GuildUsers({name: 'Gam', users: 'Yohlee'}));
// guild_users.add(new GuildUsers({name: 'Gon', users: 'Eunhkim'}));
// guild_users.add(new GuildUsers({name: 'Gon', users: 'Iwoo'}));

// var guild_view = new GuildView({el:$("#guild-view-container")});
