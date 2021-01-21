import { router } from '../internal'

export let SignupView = Backbone.View.extend({
    el: '#signup-modal',

    events: {
        'click .signup.button': 'signup',
    },

    initialize: function() {
        this.modal_id = '#signup-modal';
        this.input = this.modal_id + ' input';
        this.error_label = '#signup-error';
        this.data = {"user": {}};
        $(this.modal_id).modal({ onHide: function() { router.navigate('#/home'); }} ).modal('hide');
    },

    signup: function() {
        this.data['user']['intra_id'] = $(this.input).eq(0).val();
        this.data['user']['email'] = $(this.input).eq(1).val();
        this.data['user']['password'] = $(this.input).eq(2).val();
        let obj = this;
        fetchContainer('/users/signup', 'POST', this.data).then(function(result) {
            if (result.hasOwnProperty('user')) {
                sessionStorage.setItem('status', 'login');
                $(obj.modal_id).modal('hide');
                $('a[data-sign-value=signin]').addClass('invisible');
                $('a[data-sign-value=signup]').addClass('invisible');
                $('a[data-sign-value=logout]').removeClass('invisible');
                router.navigate('#/home');
            } else {
                obj.showErrorMessage(result);
            }
        });
    },

    showErrorMessage: function(result) {
        $(this.error_label).html(result['errors']['message']);
        $(this.error_label).removeClass('invisible');
    }
})
