import { router } from '../internal'
import { Users } from '../internal'

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
        $(this.modal_id).modal({ onHide: function() { router.navigate('#/home'); }} ).modal('show');
    },

    signin: function() {
        this.data['user']['intra_id'] = $(this.input).eq(0).val();
        this.data['user']['password'] = $(this.input).eq(1).val();
        // fetchContainer.bind(this, '/users/login', 'POST', this.data).bind.then(this, function)
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


