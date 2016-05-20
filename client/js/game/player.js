class Player {
    constructor (options) {
        this.id = options.id;
        this.name = options.name;
        this.color = options.color;
        this.score = 0;
        this.ammo = 0;
        this.shield = 0;
    }
}

export default Player;