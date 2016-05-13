export default class {

    constructor () {
        this.canvas = document.getElementById('playground');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.flyingObjects = [];
    }

    start () {
        this.updateCanvas();
    }

    addFlyingObject (flyingObject) {
        flyingObject.game = this;
        this.flyingObjects.push(flyingObject);
    }

    // this happens with 60 frames per second
    updateCanvas () {

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = 'rgba(0,0,0,0.8)';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawFlyingObjects();
        this.checkCollisions();

        requestAnimationFrame(() => this.updateCanvas());
    }

    checkCollisions () {
        if(this.flyingObjects) {
            for(let i = 0; i < this.flyingObjects.length; i++) {
                let flyingObject1 = this.flyingObjects[i];

                for(let n = 0; n < this.flyingObjects.length; n++) {
                    let flyingObject2 = this.flyingObjects[n];

                    if(flyingObject1 === flyingObject2) {
                        continue;
                    }

                    let dx = flyingObject1.x - flyingObject2.x;
                    let dy = flyingObject1.y - flyingObject2.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    //console.log(dx);

                    if(distance < (flyingObject1.radius + flyingObject2.radius)) {
                        console.debug('collision ' + flyingObject1.constructor.name + ' and ' + flyingObject2.constructor.name);
                        console.debug('collision ' + flyingObject1.x + ' and ' + flyingObject2.x);
                        let pos1 = this.flyingObjects.indexOf(flyingObject1);
                        this.flyingObjects.splice(pos1, 1);
                        let pos2 = this.flyingObjects.indexOf(flyingObject2);
                        this.flyingObjects.splice(pos2, 1);
                    }
                }
            }
        }
    }

    drawFlyingObjects () {
        if(this.flyingObjects) {
            for(let i = 0; i < this.flyingObjects.length; i++) {
                this.flyingObjects[i].update(this.keyboard);
                this.flyingObjects[i].draw();
            }
        }
    }
}
