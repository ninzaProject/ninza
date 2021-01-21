import { router } from '../internal'
import { User } from '../internal'
import { Users } from '../internal'
import { UserStatusView } from '../internal'
// import { appView } from '../internal'
import { app } from '../internal'
import { connectSideBarChannel } from '../internal'

export let SigninView = Backbone.View.extend({
  el: '#signin-modal',

  events: {
    'click .signin.button': 'signin',
    'click .signup.button': 'signup',
  },

  initialize: function() {
    this.modal_id = '#signin-modal';
    this.input = this.modal_id + ' input';
    this.error_label = '#signin-error';
    this.data = {"user": {}};
    $(this.modal_id).modal({ onHide: function() { router.navigate('#/home'); }} ).modal('hide');
  },

  signin: function() {
    this.data['user']['intra_id'] = $(this.input).eq(0).val();
    this.data['user']['password'] = $(this.input).eq(1).val();
    let obj = this;

    fetchContainer('/users/signin', 'POST', this.data).then(function(result) {
      console.log("signin")
      if (result.hasOwnProperty('user')) {
        sessionStorage.setItem('status', 'login');
        $(obj.modal_id).modal('hide');
        $(obj.modal_id).modal.intra_id = '';
        $(obj.modal_id).modal.password = '';
        $('a[data-sign-value=signin]').addClass('invisible');
        $('a[data-sign-value=signup]').addClass('invisible');
        $('a[data-sign-value=logout]').removeClass('invisible');

        // 로그인에 성공하면 해야할 작업들
        app.side_bar_view.makeUserList();
        app.side_bar_channel = connectSideBarChannel();

        // 수많은 채널을 구독할텐데 특정 채널만을 구독 해제하기 위해서는 채널을 들고 다녀야한다?
        // app.side_bar_view.channel = connectSideBarChannel(); //unsubscribed

        router.navigate('#/home');
      } else {
        obj.showErrorMessage(result);
      }
    });
  },

  signup: function() {
    router.navigate('#/signup');
  },

  showErrorMessage: function(result) {
    $(this.error_label).html(result['errors']['message']);
    $(this.error_label).removeClass('invisible');
  }
})
