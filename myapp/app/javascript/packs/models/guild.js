export let GuildModel = Backbone.Model.extend({

  urlRoot: 'guild-model',
  defaults: {
    rank: 0,
    name: 'Gam', // 길드이름
    guild_points: 0,
    officer: 'yohlee', // 길드관리자
    // unique_anagram: 'Gam', // 길드약자 (max 5 letters) + 유효성검사
    // guild_rank: 1, // 길드랭킹 (다른길드와비교)
    // users: '', // 길드유저들 -> rails db에서 받아와야 함.

    // user_rank_in_guild: {'sanam': 1, 'jujeong': 2}, // 유저랭킹 (길드 안에서) + Top contributor
    // wartime: 0, // 워타임
    // warTime <-- guild1 guild2
    // user_status: {'sanam':'off', 'jujeong':'on'}  // 길드유저 접속 여부, 게임 중
  },

  initialize: function(data) {
    this.rank = data.rank;
    this.name = data.name;
    this.guild_points = data.guild_points;
    this.officer = data.officer
  },
  // validate: function(attr){
  //   if (!attr.unique_anagram)
  //     return "name is required"
  // }
});

// 길드 생성버튼 눌렀을 때
// var new_guild = new GuildModel();
// var new_guild_info = {
//   name: 'gam',
//   symbol: 'gam',
//   officer: 'yohlee',
//   users: 'sanam, jujeong',
//   guild_rank: 1,
//   user_rank_in_guild: {
//     'sanam': 1,
//     'jujeong': 2
//   },
//   wartime: 0,
//   user_status: {
//     'sanam': 'off',
//     'jujeong': 'on'
//   }
// };
// new_guild_info.save(new_guild_info, {
//   success: function(new_guild) {
//     alert(new_guild.toJSON());
//   },
//   error: function(new_guild) {
//     alert(new_guild.toJSON());
//   }
// });
