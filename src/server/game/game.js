import ObjectEmitter from '../objects/emitter';
import {UPDATE_OBJECTS, UPDATE_PLAYERS} from '../../events';

export default class {

    constructor (io, stage, sound) {
        this.io = io;
        this.stage = stage;
        this.sound = sound;

        this.players = new Map();
        this.objects = new Map();
    }

    start () {
        setInterval( () => this.updateObjects(), 35);
        setInterval( () => this.updateClient(), 17);
        new ObjectEmitter(this).start();
    }

    addPlayer(player) {
        if(!this.players.has(player.id)) {
            this.players.set(player.id, player);
            this.addObject(player.character);
        }
    }

    addObject(object) {
        object.game = this;
        this.objects.set(object.id, object);
    }

    removeObject(object) {
        this.objects.delete(object.id);
    }

    updateObjects () {
        if (this.objects.size > 0) {
            this.objects.forEach((object) => {
                object.update();
                object.checkValid();
            });
        }
        this.collide();
    }

    updateClient () {
        let objects = {};
        if (this.objects.size > 0) {

            let sortedObjects = new Map([...this.objects.entries()].sort((a,b) => {
                let object1 = a[Object.keys(a)[1]];
                let object2 = b[Object.keys(b)[1]];
                return object1.zIndex > object2.zIndex ? 1 : object1.zIndex < object2.zIndex ? -1 : 0;
            }));

            sortedObjects.forEach(object => {
                objects[object.id] = {
                    id: object.id,
                    type: object.constructor.name,
                    label: object.label,
                    color: object.color,
                    visible: object.visible,
                    x: object.position.x,
                    y: object.position.y,
                    size: object.size,
                    rotation: object.rotation,
                    unicode: object.unicode,
                    sprite: object.skin,
                    shield: object.shield
                };
            });
        }

        let players = {};
        if (this.players.size > 0) {
            this.players.forEach(player => {
                players[player.id] = {
                    id: player.id,
                    name: player.name,
                    ammo: player.ammo,
                    score: player.score,
                    color: player.color
                };
            });
        }

        this.io.emit(UPDATE_OBJECTS, objects);
        this.io.emit(UPDATE_PLAYERS, players);
    }

    collide () {
        this.objects.forEach((object1) => {
            this.objects.forEach((object2) => {

                if (!object1.visible || !object2.visible) return;
                if (!object1.alive || !object2.alive) return;
                if (object1 === object2) return;
                if (object1.player === object2.player) return;

                object2.collide(object1);
                object1.collide(object2);
            });
        });
    }
}
