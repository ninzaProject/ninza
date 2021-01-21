import { __esModule } from '@rails/actioncable';
import { Draw } from '../internal'

export const Score = Backbone.Model.extend({
    defaults: {
    },
    initialize: function(cvs, ctx) {
        this.ctx = ctx;
        this.x = cvs.width/4;
        this.y = cvs.height/5;
        this.left = 0;
        this.right = 0;
        this.fillstyle = "BLACK";
        this.font = "45px fantasy";
        this.goal = 3;
    },
    
    setGoal: function(data) {
        this.goal = +data.goal;
    },

    isGameEnd: function() {
      return (_.max([this.left, this.right]) == this.goal);
    },
    
    isWin: function(side) {
        return ((side == 'LEFT' && this.left > this.right)
        || (side == 'RIGHT' && this.right > this.left));
    },

    update: function(data) {
        this.left = +data.left;
        this.right = +data.right;
    },

    render: function() {
        Draw.drawText(this.ctx, this.left, this.x, this.y, this.font, this.fillstyle); // draw left score
        Draw.drawText(this.ctx, this.right, 3 * this.x, this.y, this.font, this.fillstyle); // draw right score
        return this;
    }
});
