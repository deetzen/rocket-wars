import {MAX_AMMO} from '../../../constants';

export default class {

    constructor (socket) {
        this.socket = socket;
        this.canvas = document.getElementById('playground');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = 800;
        this.canvas.height = 500;
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

    // this happens within the server's update loop
    drawCanvas () {
        this.drawBackground();
        this.drawFlyingObjects();
        this.drawHighscore();
        this.drawAmmo();
    }

    drawBackground () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = 'rgba(0,0,0,0.800)';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawAmmo () {
        this.context.font = '14px Verdana';
        this.context.fillStyle = 'rgba(255,255,255,0.8)';
        this.context.fillRect(window.innerWidth - 160, 10, 150, (this.players.length * 20) + 10);

        for(let i = 1; i <= this.players.length; i++) {
            let player = this.players[i-1];
            this.context.fillStyle = 'rgba(0,0,0,0.3)';
            this.context.fillRect(window.innerWidth - 150, (i * 10) + (i * 10), 130, 10);
            this.context.shadowColor = 'transparent';
            this.context.fillStyle = player.color;
            this.context.fillRect(window.innerWidth - 150, (i * 10) + (i * 10), 130/MAX_AMMO * player.ammo, 10);
        }
    }

    drawHighscore() {

        let playerTextWidth = 0;
        this.players.sort(function(a, b) {
            return a.score > b.score ? -1 : a.score < b.score ? 1 : 0;
        });

        this.context.font = '14px Verdana';
        this.context.shadowColor = 'rgba(0,0,0,0.5)';

        let i = 1;
        for (let player in this.players) {
            let playerText = i + '. ' + this.players[player].name + " [" + this.players[player].score.toString() + ']';
            playerTextWidth = this.context.measureText(playerText).width > playerTextWidth ? this.context.measureText(playerText).width : playerTextWidth;
            i++;
        }

        this.context.fillStyle = 'rgba(255,255,255,0.8)';
        this.context.fillRect(10, 10, playerTextWidth + 55, this.players.length * 20 + 30);

        i = 1;
        for(let player in this.players) {
            this.context.fillStyle = this.players[player].color;
            this.context.shadowColor = 'rgba(0,0,0,0.4)';
            this.context.shadowOffsetX = 1;
            this.context.shadowOffsetY = 1;
            this.context.shadowBlur = 1;
            let playerText = i + '. ' + this.players[player].name;
            let playerPoints = this.players[player].score.toString();

            this.context.textAlign = 'left';
            this.context.fillText(playerText, 25, (i * 20) + 20);

            this.context.fillStyle = 'rgba(0,0,0,0.5)';
            this.context.textAlign = 'right';
            this.context.fillText(playerPoints, playerTextWidth + 50, (i * 20) + 20);
            i++;
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
