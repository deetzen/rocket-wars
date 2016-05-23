import {MAX_AMMO, STAGE_WIDTH} from '../../../constants';

export default class {

    constructor (socket) {
        this.socket = socket;
        this.canvas = document.getElementById('playground');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.players = [];
        this.objects = [];
    }

    addPlayer(player) {
        this.players.push(player);
    }

    addObject(object) {
        object.game = this;
        this.objects.push(object);
    }

    setBackground (sprite) {
        this.background = sprite;
    }

    // this happens within the server's update loop
    drawCanvas () {
        this.drawBackground();
        this.drawFlyingObjects();
        this.drawHighscore();
        this.drawAmmo();
    }

    drawBackground () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.background.draw(this.context, this.canvas.width/2, this.canvas.height/2, 0, this.canvas.width);
    }

    drawAmmo () {
        if (!this.players.length) return;

        this.context.font = '14px Verdana';
        this.context.fillStyle = 'rgba(255,255,255,0.8)';
        this.context.fillRect(window.innerWidth - 160, 10, 150, 30);

        let i = 1;
        for(let index in this.players) {
            let player = this.players[index];

            if (player.id.substring(2) != this.socket.id) continue;

            this.context.fillStyle = 'rgba(0,0,0,0.3)';
            this.context.fillRect(window.innerWidth - 150, (i * 10) + (i * 10), 130, 10);
            this.context.shadowColor = 'transparent';
            this.context.fillStyle = player.color;
            this.context.fillRect(window.innerWidth - 150, (i * 10) + (i * 10), 130/MAX_AMMO * player.ammo, 10);
            i++;
        }
    }

    drawHighscore() {
        if (!this.players.length) return;

        let playerList = this.players.slice(0);
        let playerTextWidth = 0;
        playerList.sort(function(a, b) {
            return a.score > b.score ? -1 : a.score < b.score ? 1 : 0;
        });

        this.context.font = '14px Verdana';
        this.context.shadowColor = 'rgba(0,0,0,0.5)';

        for(let i = 1; i <= playerList.length; i++) {
            let playerText = i + '. ' + playerList[i-1].name + " [" + playerList[i-1].score.toString() + ']';
            playerTextWidth = this.context.measureText(playerText).width > playerTextWidth ? this.context.measureText(playerText).width : playerTextWidth;
        }

        this.context.fillStyle = 'rgba(255,255,255,0.8)';

        let height = playerList.length * 20 + 10;
        height = height >= 90 ? 90 : height;
        this.context.fillRect(10, 10, playerTextWidth + 50, height);

        let j = 1;
        for(let i = 1; i <= playerList.length; i++) {
            if (i <= 3 || playerList[i-1].id.substring(2) === this.socket.id) {
                this.context.fillStyle = playerList[i-1].color;
                this.context.shadowColor = 'rgba(0,0,0,0.8)';
                this.context.shadowOffsetX = 1;
                this.context.shadowOffsetY = 1;
                this.context.shadowBlur = 0;
                let playerText = i + '. ' + playerList[i-1].name;
                let playerPoints = playerList[i-1].score.toString();

                this.context.textAlign = 'left';
                this.context.fillText(playerText, 20, (j * 20) + 10);

                this.context.fillStyle = 'rgba(0,0,0,0.8)';
                this.context.textAlign = 'right';
                this.context.fillText(playerPoints, playerTextWidth + 50, (j * 20) + 10);
                j++;
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
