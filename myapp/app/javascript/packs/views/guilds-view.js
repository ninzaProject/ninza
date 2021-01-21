import { router } from '../internal'
import { Guilds } from '../internal'
import { GuildModel } from '../internal'
import { GuildView } from '../internal'

export let GuildsView = Backbone.View.extend({
  template: _.template($("#guilds-view").html()),
  el: '#main-view',
  // events: {
  //   "click .generate-guild-button":"generateGuild",
  //   "click .watch-guild-button":"watchGuild",
  // 버튼 클릭 시 div class="item active selected"로 바뀜.
  // },

  initialize: function() {
    this.$guilds = "";
  },

  render: function() {
    this.$el.html(this.template());
    this.$list = this.$(".guild-list");

    let obj = this;
    async function getGuildList() {
      let guild_list = await fetchContainer("/guild", "GET");
      let guild_model;
      let guild_view;
      for (let guild of guild_list) {
        guild_model = new GuildModel(guild);
        // guild_view = new GuildView(guild_model.toJSON());
        // 문제: 길드 구경하기 누르면 처음 누를 때는 GuildsView가 보이는데, 다른 route로 갔다가 다시 길드 구경하기 누르면, GuildsView가 안 보인다.
        // 원인:
        // 길드로 갔다가 다른 것으로 이동할 때만 Main-view가 없어짐.
        // /#/guilds로 이동 시 main-view 태그 자체가 사라짐. (첫번째이동시에는 있음. 두번째부터 사라짐.)
        // /#/chat -> /#/rank
        // /#/rank -> /#/home 등으로 이동 시에는 main-view 그대로 남아있음. -> 메인 뷰 안에 div가 삽입됨.
        
        // 가설 1:
        // render를 본 함수에서도 사용하는 것. -> x
        // 
        // 가설 2:
        // renderMainView 처럼 guilds_view 에서 guild_view를 만들 때
        // 기존에 남아있던 guild-list를 삭제하지 않고 guild_view를 덮어씌우기 때문
        // 가설 3:
        // router에서 view를 삭제하면서 main_view 태그가 사라진다.

        if (isLoggedIn()) {
          console.log("You are logined!")
        } else {
          console.log("You are not logined!")
        }


        guild_view = new GuildView(guild_model.toJSON());
        obj.$list.append(guild_view.render().el);
      }

      // renderMainView: function (view) {
      //   if (this.currentMainView) {
      //     this.currentMainView.remove();
      //   }
      //   view.render();
      //   this.currentMainView = view;
      //   return this;
      // },

      return obj;
    }
    getGuildList();
  }
});