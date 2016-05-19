import {MAX_VELOCITY,MIN_VELOCITY} from '../constants';
import Vector from '../utils/vector';

class FlyingObject
{
    constructor (stage, options) {
        this.vector = new Vector(0, 0);
        this.position = new Vector(options.x, options.y);
        this.mass = 10;
        this.elasticity = 0.2;
        this.stage = stage;
        this.canvas = this.stage.canvas;
        this.context = this.stage.context;
        this.visible = options.visible || true;
        this.label = options.label || false;
        this.shadow = options.shadow || false;
        this.game = options.game || null;
        this.player = options.player || null;
        this.rotation = options.rotation || 0;
        this.color = options.color || 'lightpink';
        this.unicode = options.unicode || '';
        this.velocity = options.velocity;
        this.size = options.size ? options.size : 45;
    }

    collide (obj) {
        let dt, mT, v1, v2, cr, sm,
            dn = new Vector(this.position.x - obj.position.x, this.position.y - obj.position.y),
            sr = this.size + obj.size,
            dx = dn.length();

        if (dx > sr) {
            return;
        }

        sm = this.mass + obj.mass;
        dn.normalize();
        dt = new Vector(dn.y, -dn.x);

        mT = dn.multiply(this.size + obj.size - dx);
        this.position.tx(mT.multiply(obj.mass / sm));
        obj.position.tx(mT.multiply(-this.mass / sm));

        cr = Math.min(this.elasticity, obj.elasticity);

        v1 = dn.multiply(this.vector.dot(dn)).length();
        v2 = dn.multiply(obj.vector.dot(dn)).length();

        this.vector = dt.multiply(this.vector.dot(dt));
        this.vector.tx(dn.multiply((cr * obj.mass * (v2 - v1) + this.mass * v1 + obj.mass * v2) / sm));

        obj.vector = dt.multiply(obj.vector.dot(dt));
        obj.vector.tx(dn.multiply((cr * this.mass * (v1 - v2) + obj.mass * v2 + this.mass * v1) / sm));

        obj.hit(this);
    }

    draw () {
        if (!this.checkValid() || !this.visible) {
            return;
        }

        this.context.save();

        // draw object
        this.context.fillStyle = this.color;
        this.context.textAlign = 'left';
        this.context.translate(this.position.x, this.position.y);

        this.context.font = this.size + 'px FontAwesome';
        let textWidth = this.context.measureText(this.unicode).width;

        if (this.label) {
            this.drawLabel(textWidth);
        }

        if (this.shadow) {
            this.drawShadow();
        }

        this.context.font = this.size + 'px FontAwesome';
        this.context.rotate(this.rotation * Math.PI / 180);
        this.context.fillText(this.unicode, -(textWidth / 2), (textWidth / 3.4));

        this.context.restore();
    }

    drawShadow () {
        this.context.shadowColor = 'rgba(0,0,0,0.5)';
        this.context.shadowOffsetX = 2;
        this.context.shadowOffsetY = 2;
        this.context.shadowBlur = 1;
    }

    drawLabel (textWidth) {
        this.context.font = (this.size / 3) + 'px Arial';
        this.context.fillStyle = this.color;
        this.context.fillText(this.player.name, -textWidth/2, textWidth);
    }

    update () {

        let angle = this.rotation * Math.PI / 180;
        this.position.x += this.velocity * Math.cos(angle) + this.vector.x;
        this.position.y += this.velocity * Math.sin(angle) + this.vector.y;

        if(this.canvas.width < this.position.x) {
            this.position.x = 0;
        } else if (this.position.x < 0) {
            this.position.x = this.canvas.width;
        }

        if(this.canvas.height < this.position.y) {
            this.position.y = 0;
        } else if(this.position.y < 0) {
            this.position.y = this.canvas.height;
        }
    }

    rotateRight () {
        this.rotation += MIN_VELOCITY / 2.5;
    }

    rotateLeft () {
        this.rotation -= MIN_VELOCITY / 2.5;
    }

    speedUp () {
        if (this.velocity < MAX_VELOCITY) {
            this.velocity += 0.2;
        }
    }
    speedDown () {
        if (this.velocity > MIN_VELOCITY) {
            this.velocity -= 0.2;
        }
    }

    hit () {}
    destroy () {}
    checkValid () {
        return true;
    }
}

export default FlyingObject;

