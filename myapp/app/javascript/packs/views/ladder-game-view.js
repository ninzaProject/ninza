import { app, connectLadderGameChannel, Ball, Net, Player, Score, Draw } from '../internal'

export let LadderGameView = Backbone.View.extend({
    template: _.template($('#ladder-game-template').html()),

    initialize: function() {
        $('#main-view').html(this.template);
        this.cvs = document.getElementById("game-canvas");
        this.ctx = this.cvs.getContext("2d");
        app.game_channel = null;
        this.match_id = null;
        this.user_id = sessionStorage.getItem('user_id');
        this.net = new Net(this.cvs, this.ctx);
        this.ball = new Ball(this.cvs, this.ctx);
        this.me = new Player(this.cvs, this.ctx, 0, this.cvs.height/2 - 100/2, 'BLACK', 'LEFT');
        this.op = new Player(this.cvs, this.ctx, this.cvs.width - 10, this.cvs.height/2 - 100/2, 'BLACK', 'RIGHT');
        this.score = new Score(this.cvs, this.ctx);
        this.clear_key = null;
        
        document.onkeydown = this.checkKey.bind(this);
        this.joinMatch();
        sessionStorage.setItem('status', 'play');
    },

    joinMatch: function() {
        app.game_channel = connectLadderGameChannel(this.recv, this);
    },

    render: function() {
        Draw.drawRect(this.ctx, 0, 0, this.cvs.width, this.cvs.height, "WHITE");
        this.net.render();
        this.ball.render();
        this.me.render();
        this.op.render();
        this.score.render();
    },

    checkKey: function(e) {
        e = e || window.event;
        if (e.keyCode == 38) {
            this.me.moveUp(this);
        } else if (e.keyCode == 40) {
            this.me.moveDown(this);
        }
    },

    collision: function(b,p) {
        b.top = b.y - b.radius;
        b.bottom = b.y + b.radius;
        b.left = b.x - b.radius;
        b.right = b.x + b.radius;
        
        p.top = p.y;
        p.bottom = p.y + p.height;
        p.left = p.x;
        p.right = p.x + p.width;
    
        return b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom; 
    },
    
    speak: function(object) {
        if (object != 'BALL' && object != 'SCORE' && object != 'PLAYER')
            return ;
        
            let message = {
            "type": "BROADCAST",
            "object": object,
            "sender": this.user_id+'',
            "match_id": this.match_id+'',
        };

        if (object == 'PLAYER') {
            message['y'] = this.me.y+'';
        } else if (object == 'BALL') {
            message['x'] = this.ball.x+'';
            message['y'] = this.ball.y+'';
            message['speed'] = this.ball.speed+'';
            message['accel_speed'] = this.ball.accel_speed+'';
            message['velocityX'] = this.ball.velocityX+'';
            message['velocityY'] = this.ball.velocityY+'';
            message['radius'] = this.ball.radius+'';
            message['opacity'] = this.ball.opacity+'';
            message['eventCount'] = this.ball.eventCount+'';
        } else if (object == 'SCORE') {
            const modify = (this.me.side == 'LEFT') ? [0, 1] : [1, 0];
            message['left'] = (this.score.left + modify[0])+'';
            message['right'] = (this.score.right + modify[1])+'';
        }
        
        app.game_channel.speak(message);

        if (this.score.isGameEnd()) {
          if ((this.me.side == 'LEFT' && this.score.left > this.score.right)
          || (this.me.side == 'RIGHT' && this.score.right > this.score.left)) {
            fetchContainer('/match/report', 'POST', {
              'user_id': this.user_id+'',
              'match_id': this.match_id+'',
              'result': this.score.isWin(this.me.side) ? 'WIN' : 'LOSE',
              'score': (this.me.side == 'LEFT' ? this.score.left : this.score.right) + '',
              'score2': (this.me.side == 'LEFT' ? this.score.right : this.score.left) + ''
            });
          }
        }
    },

    engine: function() {
        this.ball.move();
        if (this.collision(this.ball, this.me)) {
            this.ball.hit(this.me);
            this.speak('BALL');
        }
        if (this.ball.goaled(this.me.side)) {
          this.speak('SCORE');
        }
    },

    playRoutine: function() {
        this.engine();
        this.render();
    },

    play: function(data) {
        if (data['right'] == this.user_id)
            [this.me, this.op] = [this.op, this.me];
        this.match_id = data['match_id'];
        this.ball.setEngine(data);
        this.score.setGoal(data);
        const framePerSecond = 50;
        this.clear_key = setInterval(this.playRoutine.bind(this), 1000/framePerSecond);
        $('#ladder-game-app').removeClass('invisible');
        $('#ladder-game-section').addClass('invisible');
    },


    update: function(data) {
      switch(data['object']) {
        case 'PLAYER':
          if (this.user_id != data['sender']) {
              this.op.update(data);
          }
          break;
        case 'BALL':
          if (data['sender'] != this.user_id+'') {
            this.ball.update(data);
          }
          break ;
          case 'SCORE':
          this.score.update(data);
          this.ball.reset();
          break;
      }
    },

  recv: function(data) {
    if (data['type'] == 'BROADCAST')
      this.update(data);
    else if (data['type'] == 'START')
      this.play(data);
    else if (data['type'] == 'GIVEUP' || data['type'] == 'END') {
      clearInterval(this.clear_key);
      document.onkeydown = null;
    }
  }
})

