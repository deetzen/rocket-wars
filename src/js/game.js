export default class {

    constructor () {
        this.canvas = document.getElementById('playground');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.players = [];
        this.ammos = [];
    }

    start () {
        this.updateCanvas();
    }

    addPlayer(player) {
        player.character.game = this;
        this.players.push(player);
    }

    addAmmo(object) {
        object.game = this;
        this.ammos.push(object);
    }

    // this happens with 60 frames per second
    updateCanvas () {

        this.drawBackground();
        this.drawFlyingObjects();
        this.drawHighscore();
        this.checkCollisions();

        requestAnimationFrame(() => this.updateCanvas());
    }

    drawBackground () {

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = 'rgba(0,0,0,0.5)';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        /*
        var background = new Image();
        background.src = 'images/lasvegas.jpg';

        this.context.drawImage(background, 0,0);
         */
    }

    drawHighscore() {

        let playerList = this.players.slice(0);
        let playerTextWidth = 0;
        playerList.sort(function(a, b) {
            return a.score > b.score ? -1 : a.score < b.score ? 1 : 0;
        });

        this.context.font = '14px Verdana';

        for(let i = 1; i <= playerList.length; i++) {
            let playerText = i + '. ' + playerList[i-1].name + " [" + playerList[i-1].score.toString() + ']';
            playerTextWidth = this.context.measureText(playerText).width > playerTextWidth ? this.context.measureText(playerText).width : playerTextWidth;
        }

        this.context.fillStyle = 'rgba(255,255,255,0.8)';
        this.context.fillRect(10, 10, playerTextWidth + 55, playerList.length * 20 + 30);

        for(let i = 1; i <= playerList.length; i++) {
            this.context.fillStyle = playerList[i-1].color;
            this.context.shadowColor = 'rgba(0,0,0,0.4)';
            this.context.shadowOffsetX = 1;
            this.context.shadowOffsetY = 1;
            this.context.shadowBlur = 1;
            let playerText = i + '. ' + playerList[i-1].name;
            let playerPoints = playerList[i-1].score.toString();

            this.context.textAlign = 'left';
            this.context.fillText(playerText, 25, (i * 20) + 20);

            this.context.fillStyle = 'rgba(0,0,0,0.5)';
            this.context.textAlign = 'right';
            this.context.fillText(playerPoints, playerTextWidth + 50, (i * 20) + 20);
        }

    }

    checkCollisions () {
        if(this.ammos) {
            for(let i = 0; i < this.ammos.length; i++) {
                let ammo = this.ammos[i];

                for(let n = 0; n < this.players.length; n++) {
                    let player = this.players[n];

                    if (!player.character.alive) continue;
                    if (player === ammo.player) continue;

                    let dx = ammo.x - player.character.x;
                    let dy = ammo.y - player.character.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if(distance < (ammo.radius + player.character.radius)) {
                        this.collision(player, ammo);
                    }
                }
            }
        }
    }

    collision (player, ammo) {
        console.debug('collision ' + player.name + ' and ammo from ' + ammo.player.name);
        console.debug('collision ' + player.character.x + ' and ' + ammo.x);
        this.ammos.splice(this.ammos.indexOf(ammo), 1);
        player.character.alive = false;

        ammo.player.score++;

        setTimeout(function() {
            player.character.x = Math.round(Math.random() * window.innerWidth) + 1;
            player.character.y = Math.round(Math.random() * window.innerHeight) + 1;
            player.character.rotation = Math.round(Math.random() * 360) + 1;
            player.character.alive = true;
        }, 2000);

        var snd = new Audio("sounds/explode.wav"); // buffers automatically when created
        snd.play();
    }

    drawFlyingObjects () {
        if (this.players) {
            for (let i = 0; i < this.players.length; i++) {
                this.players[i].character.update(this.keyboard);
                this.players[i].character.draw();
            }
        }

        if (this.ammos) {
            for (let i = 0; i < this.ammos.length; i++) {
                this.ammos[i].update(this.keyboard);
                this.ammos[i].draw();
            }
        }
    }
}
