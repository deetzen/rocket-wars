class Player {
    constructor (options) {
        this.id = options.id;
        this.name = options.name;
        this.color = options.color;
        this.score = options.score;
        this.ammo = options.ammo;
        this.shield = options.shield;
    }
}

export default Player;