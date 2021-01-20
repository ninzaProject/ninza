import { Router } from '../internal'
import { Users } from '../internal'
import { User } from '../internal'
import { UserStatusView } from '../internal'

// 로그인을 했을 때, 게스트일 때
// 사이드바를 그냥 텍스트로 로그인하면 하면 볼수있습니다.

export let SideBarView = Backbone.View.extend({
    el: '#side-bar-view',

    // view
    initialize: function() {
        if (isLoggedIn()) {
            this.user_list = new Users();

            let obj = this; //side_bar_views 객체를 objs에 저장.
            let result = fetchContainer('/users/logined_user_list')
            .then(function(result) {
                for (let user of result.list) {
                    let user_model = new User(user);
                    obj.user_list.add(user_model);
                }
                })
            .then(function() {
                for (let user of obj.user_list) {
                    let user_status_view = new UserStatusView({model: user})
                    obj.$el.children().append(user_status_view.render().$el);
                }
            });
            console.log(result);
        } else {
        }
    },
})
