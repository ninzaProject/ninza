import { Draw } from '../internal'

export const Ball = Backbone.Model.extend({
    initialize: function(cvs, ctx, engine) {
        this.cvs = cvs;
        this.ctx = ctx;
        this.x = cvs.width/2;
        this.y = cvs.height/2;
        this.radius = 10;
        this.speed = 5;
        this.accel_speed = 0.1;
        this.velocityX = 5;
        this.velocityY = 5;
        this.opacity = 1;
        this.color = "BLACK";
        this.engine = engine;
        this.eventCount = 0;
    },

    setEngine: function(data) {
        this.engine = {
            'ball': data['addon_ball'],
            'speed': data['addon_speed'],
            'bound': data['addon_bound']
        }
    },

    applyAddonBall: function() {
        let mode = this.engine['ball'];
        switch(mode) {
            case 'OPACITY':
                this.opacity = _.max([this.opacity - 0.02, 0.1]);
                break;
            case 'SMALL':
                if (this.eventCount % 2 == 0) {
                    this.radius = _.max([this.radius - 1, 1]);
                }
                break;
        }
    },

    applyAddonBound: function(situation) {
        if (situation != this.engine['bound'])
            return ;

        let x = Math.abs(this.velocityX);
        let y = Math.abs(this.velocityY);
        let sum = x ** 2 + y ** 2;
        let small_angle = Math.abs(x - y) < 2;

        if ((small_angle && x > y) || (!small_angle && y > x)) {
            y /= 1.5 + (this.eventCount % 3 / 2);
            x = sum - (y ** 2);
        } else {
            x /= 1.5 + (this.eventCount % 3 / 2);
            y = sum - (x ** 2);
        }

        this.velocityX = x * (this.velocityX >= 0 ? 1 : -1);
        this.velocityY = y * (this.velocityy >= 0 ? 1 : -1);
    },

    applyAddonSpeed: function(situation) {
        if (situation != this.engine['speed'])
            return ;
        this.accel_speed += this.eventCount % 2;
    },

    applyEngine: function(situation) {
        if (this.engine['ball'] != 'BASIC')
            this.applyAddonBall();
        if (this.engine['bound'] != 'BASIC')
            this.applyAddonBound(situation);
        if (this.engine['speed'] != 'BASIC')
            this.aaplyAddonSpeed(situation);
        this.eventCount += 1;
    },

    goaled: function(side) {
        return ((side == 'RIGHT' && (this.x + this.radius > this.cvs.width))
        || (side == 'LEFT' && (this.x - this.radius < 0)));
    },

    hit: function(user) {
        let collidePoint = this.y - (user.y + user.height/2);
        collidePoint = collidePoint/user.height/2;

        let angleRad = collidePoint * Math.PI/4;
        let direction = (this.x < this.cvs.width/2) ? 1 : -1;
        this.velocityX = direction * this.speed * Math.cos(angleRad);
        this.velocityY = this.speed * Math.sin(angleRad);
        this.speed += this.accel_speed;
        this.applyEngine('PADDLE');
    },

    move: function() {
        this.x += this.velocityX;
        this.y += this.velocityY;
        if (this.y + this.radius > this.cvs.height || this.y - this.radius < 0) {
            this.velocityY = -this.velocityY;
            if (Object.values(this.engine).some(mode => mode != 'BASIC'))
                this.applyEngine('WALL');
        }
    },

    render: function() {
        Draw.drawCircle(this.ctx, this.x, this.y, this.radius, this.color, this.opacity); // draw com paddle
        return this;
    },

    update: function(data) {
        this.x = +data.x;
        this.y = +data.y;
        this.velocityX = +data.velocityX;
        this.velocityY = +data.velocityY;
        this.speed = +data.speed;
        this.accel_speed = +data.accel_speed;
        this.radius = +data.radius;
        this.opacity = +data.opacity;
        this.eventCount = +data.eventCount;
    },

    reset: function() {
        this.x = this.cvs.width/2;
        this.y = this.cvs.height/2;
        this.velocityX = -this.velocityX;
    }
});
