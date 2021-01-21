import { app, Router } from '../internal'
import { Users } from '../internal'
import { User } from '../internal'
import { UserStatusView } from '../internal'
import { connectSideBarChannel } from '../internal'

export let SideBarView = Backbone.View.extend({
  el: '#side-bar-view',

  initialize: function() {
    this.user_list = new Users();

    this.listenTo(this.user_list, 'add', this.addOne);
    this.listenTo(this.user_list, 'remove', this.removeOne);
  },

  addOne: function(user) {
    console.log(user.intra_id + " is added");

    let user_status_view = new UserStatusView({id: user.id, model: user})
    this.$el.append(user_status_view.render().$el);
  },

  removeOne: function(user) {
    console.log("SomeOne is deleted");
    let lis = this.$el.children();
    for (let i = 0; i < lis.length; i++) {
      if (user.id == lis[i].id) {
        lis[i].remove();
        break ;
      }
    }
  },

  makeUserList: function() {
  let obj = this;
  this.resetSideBar();
  fetchContainer('/users/logined_user_list')
  .then(function(result) {
    for (let user of result.list) {
    let user_model = new User(user);
    obj.user_list.add(user_model);
    }
  });
  },

  resetSideBar: function() {
    this.user_list.reset();
    this.$el.children().remove();
  }
})

// app.channels.side_bar
