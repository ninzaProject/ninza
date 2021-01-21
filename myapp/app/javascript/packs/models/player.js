import { Draw } from "../internal";

export const Player = Backbone.Model.extend({
    initialize: function(cvs,ctx,x,y,color,side) {
        this.cvs = cvs;
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = 10;
        this.height = 100;
        this.score = 0;
        this.side = side;
        this.color = "BLACK";
    },

    moveUp: function(self){
        this.y = Math.max(this.y - 8, 0 - this.height/2);
        self.speak('PLAYER');
    },

    moveDown: function(self){
        this.y = Math.min(this.y + 8, this.cvs.height - this.height/2);
        self.speak('PLAYER');
    },

    update: function(data) {
        this.y = +data['y'];
    },

    render: function() {
        Draw.drawRect(this.ctx, this.x, this.y, this.width, this.height, this.color);
        return this;
    }
});
