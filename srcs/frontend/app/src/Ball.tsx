import Point from './Point.tsx'
import Vector from './Vector.tsx'
import Paddle from './Paddle.tsx'

export default class Ball {
    pos: Point;
	speed: Vector;
	rad: number;

    constructor(width: number, height: number, rad: number) {
        this.pos = { x: width/2, y: height/2};
        this.speed = {angle: -Math.PI + (Math.random() * 2 * Math.PI), length: 4};
        this.rad = rad;
    }

    continuePath() {
        this.pos.x += Math.cos(this.speed.angle) * this.speed.length;
        this.pos.y += Math.sin(this.speed.angle) * this.speed.length;
    }

    bounce(pad: Paddle) {
        
    }
}