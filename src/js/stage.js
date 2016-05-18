export default class Stage {
    constructor (canvas) {
        this.canvas = canvas;

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.context = this.canvas.getContext('2d');
    }
}
