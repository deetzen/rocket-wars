import { ADD_PLAYER } from '../../events';
import { MAX_AMMO } from '../../constants';

export default class {
  constructor (socket) {
    this.socket = socket;
    this.canvas = null;
    this.context = null;
    this.players = [];
    this.objects = [];
  }

  start (playerName) {
    while (!playerName) {
      playerName = prompt('Please enter your player name', 'Rocket Warrior ' + Math.round(Math.random() * 5000));
    }

    this.createCanvas();

    // antialiasing for canvas ;)
    this.context.translate(0.5, 0.5);

    this.socket.emit(ADD_PLAYER, {
      name: playerName
    });
  }

  createCanvas () {
    /* remove all and add game canvas */
    document.body.innerHTML = '';

    this.canvas = document.createElement('canvas');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.context = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);
  }

  addPlayer (player) {
    this.players.push(player);
  }

  addObject (object) {
    object.game = this;
    this.objects.push(object);
  }

  // this happens within the server's update loop
  drawCanvas () {
    if (this.canvas === null) {
      return;
    }

    this.clearCanvas();
    this.drawFlyingObjects();
    this.drawHighscore();
    this.drawAmmo();
  }

  clearCanvas () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawAmmo () {
    if (!this.players.length) {
      return;
    }

    this.context.font = '14px Verdana';
    this.context.fillStyle = 'rgba(255,255,255,0.8)';
    this.context.fillRect(window.innerWidth - 160, 10, 150, 30);

    let i = 1;

    for (const index in this.players) {
      if (index) {
        const player = this.players[index];

        if (player.id !== this.socket.id) {
          continue;
        }

        this.context.fillStyle = 'rgba(0,0,0,0.3)';
        this.context.fillRect(window.innerWidth - 150, (i * 10) + (i * 10), 130, 10);
        this.context.shadowColor = 'transparent';
        this.context.fillStyle = player.color;
        this.context.fillRect(window.innerWidth - 150, (i * 10) + (i * 10), 130 / MAX_AMMO * player.ammo, 10);

        i += 1;
      }
    }
  }

  drawHighscore () {
    if (!this.players.length) {
      return;
    }

    const playerList = this.players.slice(0);
    let playerTextWidth = 0;

    playerList.sort((one, two) => one.score > two.score ? -1 : one.score < two.score ? 1 : 0);

    this.context.font = '14px Verdana';
    this.context.shadowColor = 'rgba(0,0,0,0.5)';

    for (let i = 1; i <= playerList.length; i++) {
      if (playerList[i - 1]) {
        const playerText = `${i}. ${playerList[i-1].name} [${playerList[i-1].score.toString()}]`;
        playerTextWidth = this.context.measureText(playerText).width > playerTextWidth ? this.context.measureText(playerText).width : playerTextWidth;
      }
    }

    this.context.fillStyle = 'rgba(255,255,255,0.8)';

    let height = playerList.length * 20 + 10;

    height = height >= 90 ? 90 : height;
    this.context.fillRect(10, 10, playerTextWidth + 50, height);

    let j = 1;

    for (let i = 1; i <= playerList.length; i++) {
      if (i <= 3 || playerList[i - 1].id.substring(2) === this.socket.id) {
        this.context.fillStyle = playerList[i - 1].color;
        this.context.shadowColor = 'rgba(0,0,0,0.8)';
        this.context.shadowOffsetX = 1;
        this.context.shadowOffsetY = 1;
        this.context.shadowBlur = 0;

        const playerText = `${i}. ${playerList[i - 1].name}`;
        const playerPoints = playerList[i - 1].score.toString();

        this.context.textAlign = 'left';
        this.context.fillText(playerText, 20, (j * 20) + 10);

        this.context.fillStyle = 'rgba(0,0,0,0.8)';
        this.context.textAlign = 'right';
        this.context.fillText(playerPoints, playerTextWidth + 50, (j * 20) + 10);

        j += 1;
      }
    }
  }

  drawFlyingObjects () {
    if (this.objects) {
      for (let i = 0; i < this.objects.length; i++) {
        this.objects[i].draw();
      }
    }
  }
}
