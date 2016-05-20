class FlyingObject {

    constructor () {
        this.context = null;
        this.type = '';
        this.x = 0;
        this.y = 0;
        this.rotation = 0;
        this.size = 45;
        this.skin = null;
    }

    draw () {
        if (!this.visible) {
            return;
        }

        this.context.save();

        this.context.fillStyle = this.color;
        this.context.textAlign = 'left';
        this.context.translate(this.x, this.y);

        this.context.rotate(this.rotation * Math.PI / 180);

        this.context.restore();

        if (this.skin) {
            this.skin.draw(this.context, this.x, this.y, this.rotation);
        }
    }
}

export default FlyingObject;

