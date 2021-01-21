# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

users = User.create([
  {intra_id: 'sanam', email: 'sanam@student42.co.kr', password: '123123'},
  {intra_id: 'eunhkim', email: 'eunhkim@student42.co.kr', password: '123123'},
  {intra_id: 'iwoo', email: 'iwoo@student42.co.kr', password: '123123'},
  {intra_id: 'yohlee', email: 'yohlee@student42.co.kr', password: '123123'},
  {intra_id: 'juejong', email: 'juejong@student42.co.kr', password: '123123'},
  {intra_id: 'test1', email: 'test1@student42.co.kr', password: '123123'},
  {intra_id: 'test2', email: 'test2@student42.co.kr', password: '123123'},
  {intra_id: 'test3', email: 'test3@student42.co.kr', password: '123123'},
  {intra_id: 'test4', email: 'test4@student42.co.kr', password: '123123'},
  {intra_id: 'test5', email: 'test5@student42.co.kr', password: '123123'},
  {intra_id: 'test6', email: 'test6@student42.co.kr', password: '123123'},
  {intra_id: 'test7', email: 'test7@student42.co.kr', password: '123123'},
  {intra_id: 'test8', email: 'test8@student42.co.kr', password: '123123'},
  {intra_id: 'test9', email: 'test9@student42.co.kr', password: '123123'},
  {intra_id: 'test10', email: 'test10@student42.co.kr', password: '123123'},
])

guilds = Guild.create([
  {rank: 1, name: "Gon", guild_points: 10000, officer: "iwoo"},
  {rank: 2, name: "Gam", guild_points: 8000, officer: "yohlee"},
  {rank: 3, name: "Gun", guild_points: 5000, officer: "jujeong"},
  {rank: 4, name: "Lee", guild_points: 2000, officer: "sanam"}
])