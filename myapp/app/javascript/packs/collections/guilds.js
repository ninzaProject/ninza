import { GuildModel } from "../models/guild";

var Guilds = Backbone.Collection.extend({
  model: GuildModel,
  url: 'guild'
});