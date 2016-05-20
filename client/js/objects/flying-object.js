class FlyingObject {

    constructor () {
        this.context = null;
        this.x = 0;
        this.y = 0;
        this.rotation = 0;
        this.color = 'lightpink';
        this.unicode = '';
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

        if (this.shadow) {
            this.drawShadow();
        }

        this.context.rotate(this.rotation * Math.PI / 180);

        if (this.skin) {
            this.skin.draw(this.context, this.x, this.y, this.rotation);
        }

        this.context.restore();
    }

    drawShadow () {
        this.context.shadowColor = 'rgba(0,0,0,0.5)';
        this.context.shadowOffsetX = 2;
        this.context.shadowOffsetY = 2;
        this.context.shadowBlur = 1;
    }
    
    /*
    draw () {

        let context = this.game.context;

        context.save();

        // draw object
        context.fillStyle = this.color;
        context.textAlign = 'left';
        context.translate(this.x, this.y);

        context.font = this.size + 'px FontAwesome';
        let textWidth = context.measureText(this.unicode).width;

        if (this.label) {
            // draw label
            context.font = (this.size / 2.8) + 'px Arial';
            context.fillStyle = this.color;
            context.fillText('hansi', -textWidth, textWidth);
        }

        if (this.shadow) {
            context.shadowColor = 'rgba(0,0,0,0.5)';
            context.shadowOffsetX = 2;
            context.shadowOffsetY = 2;
            context.shadowBlur = 1;
        }

        context.font = this.size + 'px FontAwesome';
        context.rotate(this.rotation * Math.PI / 180);
        context.fillText(this.unicode, -(textWidth / 2), (textWidth / 3.4));

        context.restore();
    }
    */

    hit () {}
    destroy () {}

}

export default FlyingObject;

