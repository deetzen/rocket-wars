import {MAX_AMMO} from '../constants';
import PowerUps from '../objects/powerups';

export default class {

    constructor (stage) {
        this.stage = stage;
        this.context = this.stage.context;
        this.canvas = this.stage.canvas;
        this.players = [];
        this.objects = [];
    }

    start () {
        this.updateCanvas();
        new PowerUps(this).start();
    }

    addPlayer(player) {
        this.players.push(player);
        this.addObject(player.character);
    }

    addObject(object) {
        object.game = this;
        this.objects.push(object);
    }

    removeObject(object) {
        let objectPos = this.objects.indexOf(object);
        this.objects.splice(objectPos, 1);
    }

    updateCanvas () {

        this.drawBackground();
        this.drawFlyingObjects();
        this.drawHighscore();
        this.drawAmmo();
        this.collide();

        requestAnimationFrame(() => this.updateCanvas());
    }

    drawBackground () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        let image = new Image();
        image.src = 'images/background.jpg';
        this.context.drawImage(image, 0, 0);
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
        this.context.fillRect(10, 10, playerTextWidth + 50, playerList.length * 20 + 10);

        for(let i = 1; i <= playerList.length; i++) {
            this.context.fillStyle = playerList[i-1].color;
            this.context.shadowColor = 'rgba(0,0,0,0.8)';
            this.context.shadowOffsetX = 1;
            this.context.shadowOffsetY = 1;
            this.context.shadowBlur = 0;
            let playerText = i + '. ' + playerList[i-1].name;
            let playerPoints = playerList[i-1].score.toString();

            this.context.textAlign = 'left';
            this.context.fillText(playerText, 20, (i * 20) + 10);

            this.context.fillStyle = 'rgba(0,0,0,0.8)';
            this.context.textAlign = 'right';
            this.context.fillText(playerPoints, playerTextWidth + 50, (i * 20) + 10);
        }

    }

    collide () {
        for(let i = 0; i < this.objects.length; i++) {
            let object1 = this.objects[i];

            for(let n = 0; n < this.objects.length; n++) {
                let object2 = this.objects[n];

                if (!object1.visible || !object2.visible) continue;
                if (object1 === object2) continue;
                if (object1.player === object2.player) continue;

                object1.collide(object2);
                object2.collide(object1);
            }
        }
    }

    drawFlyingObjects () {
        if (this.objects) {
            for (let i = 0; i < this.objects.length; i++) {
                this.objects[i].update(this.keyboard);
                this.objects[i].draw();
            }
        }
    }
}
