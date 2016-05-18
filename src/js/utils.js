class Utils
{
    static calcVector (xCoord, yCoord, angle, length) {
        length = typeof length !== 'undefined' ? length : 10;
        angle = angle * Math.PI / 180;
        return {
            x: length * Math.cos(angle) + xCoord,
            y: length * Math.sin(angle) + yCoord
        }
    }
}

export default Utils;