<<<<<<< HEAD
<<<<<<< HEAD
import Point from './Point.tsx'
import Vector from './Vector.tsx'
import Paddle from './Paddle.tsx'
=======
import Point from './Point'
import Vector from './Vector'
import Paddle from './Paddle'
>>>>>>> e49b0be71c731891f628bf5b7f183a3d91df2ca6
=======
import Point from './Point'
import Vector from './Vector'
import Paddle from './Paddle'
>>>>>>> 713711a906f5e375bf231914628f952534ee7b50

export default class Ball {
    pos: Point;
	speed: Vector;
	rad: number;
<<<<<<< HEAD
<<<<<<< HEAD
=======
	private CanWidth: number;
	private CanHeight: number;

>>>>>>> e49b0be71c731891f628bf5b7f183a3d91df2ca6
=======
	private CanWidth: number;
	private CanHeight: number;

>>>>>>> 713711a906f5e375bf231914628f952534ee7b50

    constructor(width: number, height: number, rad: number) {
        this.pos = { x: width/2, y: height/2};
        this.speed = {angle: -Math.PI + (Math.random() * 2 * Math.PI), length: 4};
        this.rad = rad;
<<<<<<< HEAD
<<<<<<< HEAD
    }

    continuePath() {
=======
		this.CanWidth = width;
		this.CanHeight = height;
    }

=======
		this.CanWidth = width;
		this.CanHeight = height;
    }

>>>>>>> 713711a906f5e375bf231914628f952534ee7b50
	respawn(): 'left' | 'right' | undefined  {
		if (this.pos.x < 0)
		{
			this.pos = { x: this.CanWidth/2, y: this.CanHeight/2};
			this.speed = {angle: Math.PI, length: 4};
			return ('left');
		}
		else if (this.pos.x > this.CanWidth) {
			this.pos = { x: this.CanWidth/2, y: this.CanHeight/2};
			this.speed = {angle: 0, length: 4};
			return ('right');
		}
		return (undefined);
	}

    private continuePath() {
<<<<<<< HEAD
>>>>>>> e49b0be71c731891f628bf5b7f183a3d91df2ca6
=======
>>>>>>> 713711a906f5e375bf231914628f952534ee7b50
        this.pos.x += Math.cos(this.speed.angle) * this.speed.length;
        this.pos.y += Math.sin(this.speed.angle) * this.speed.length;
    }

<<<<<<< HEAD
<<<<<<< HEAD
    bounce(pad: Paddle) {
        
=======
=======
>>>>>>> 713711a906f5e375bf231914628f952534ee7b50
	private bounceCanvas() {
		if (this.nextPos('y') > this.CanHeight - this.rad)
			this.pos = this.bounceEdges('bot');
		else if (this.nextPos('y') < this.rad)
			this.pos = this.bounceEdges('top');
		else
			this.continuePath();
	}

	nextPos(coord: 'x' | 'y'): number {
		if (coord === 'x')
			return (this.pos.x + Math.cos(this.speed.angle) * this.speed.length);
		return (this.pos.y + Math.sin(this.speed.angle) * this.speed.length);
	}

	private bounceEdges(edge: 'top' | 'bot'): Point {
		const slope: number = (this.nextPos('y') - this.pos.y) / (this.nextPos('x') - this.pos.x);
		const yIntercept : number = this.pos.y - slope * (this.pos.x);

		const y: number = (edge === 'top' ? this.rad : this.CanHeight - this.rad);
		const x: number = (y - yIntercept) / slope;

		this.speed.angle *= -1;

		return ({x: x, y: y});
	}

	private reboundPoint(dir: '+' | '-', PaddleX: number): Point {
		const slope: number = (this.nextPos('y') - this.pos.y) / (this.nextPos('x') - this.pos.x)
		const yIntercept : number = this.pos.y - slope * (this.pos.x);

		const x: number = PaddleX + (dir === '-' ? this.rad : -this.rad);
		const y: number = slope * x + yIntercept;

		return ({x: x, y: y});
	}

	private bounce(reboundPoint: Point, pad: Paddle) {
		const heightHit: number = (reboundPoint.y - pad.pos.y) / (pad.height);
		//const distBeforeHit: number = (reboundPoint.x - this.pos.x) / (this.nextPos('x') - this.pos.x);
		
		if (this.speed.angle > Math.PI / 2 || this.speed.angle < -Math.PI / 2)
			this.speed.angle = (-2 * Math.PI / 5) + (heightHit * 4 * Math.PI / 5);
		else if (heightHit <= 0.5)
			this.speed.angle = (-Math.PI) + ((Math.abs((heightHit - 0.5))/ 0.5) * (2 * Math.PI / 5));
		else
			this.speed.angle = (Math.PI) - (((heightHit - 0.5)/ 0.5) * (2 * Math.PI / 5));
		
		if (this.speed.length < 100)
			this.speed.length *= 1.1;
		console.log(this.speed.length);
		//let newX: number = reboundPoint.x + (Math.cos(this.speed.angle) * this.speed.length) * (1 - distBeforeHit);
		//let newY: number = reboundPoint.y + (Math.sin(this.speed.angle) * this.speed.length) * (1 - distBeforeHit);

		this.pos = /*{x: newX, y: newY}*/
		this.pos = reboundPoint;
	}

	private bounceInside(reboundPoint: Point, pad: Paddle) {
		const heightHit: number = (reboundPoint.y - pad.pos.y) / (pad.height);
		//const distBeforeHit: number = (reboundPoint.x - this.pos.x) / (this.nextPos('x') - this.pos.x);
		
		if (this.speed.angle > Math.PI / 2 || this.speed.angle < -Math.PI / 2)
			this.speed.angle = (-2 * Math.PI / 5) + (heightHit * 4 * Math.PI / 5);
		else if (heightHit <= 0.5)
			this.speed.angle = (-Math.PI) + ((Math.abs((heightHit - 0.5))/ 0.5) * (2 * Math.PI / 5));
		else
			this.speed.angle = (Math.PI) - (((heightHit - 0.5)/ 0.5) * (2 * Math.PI / 5));
		
		if (this.speed.length < 100)
			this.speed.length *= 1.1;
		this.continuePath();		
	}

    checkBounce(pad: Paddle) {
        if (this.speed.angle > Math.PI / 2 || this.speed.angle < -Math.PI / 2) {
			let PaddleX : number = pad.pos.x + pad.width;
			if (this.pos.x - this.rad >= PaddleX && this.nextPos('x') - this.rad < PaddleX) {
				let reboundPoint : Point = this.reboundPoint( '-' , PaddleX);
				if (reboundPoint.y >= pad.pos.y - this.rad && reboundPoint.y <= pad.pos.y + pad.height + this.rad)
					this.bounce(reboundPoint, pad);
				else
					this.bounceCanvas();
			}
			else if (this.pos.x - this.rad >= pad.pos.x && this.pos.x + this.rad <= pad.pos.x + pad.width
					&& this.pos.y >= pad.pos.y - this.rad && this.pos.y <= pad.pos.y + pad.height + this.rad) {
				this.bounceInside(this.pos, pad);
			}
			else
				this.bounceCanvas();
		} else {
			let PaddleX : number = pad.pos.x;
			if (this.pos.x  + this.rad <= PaddleX && this.nextPos('x') + this.rad > PaddleX) {
				let reboundPoint : Point = this.reboundPoint( '+' , PaddleX);
				if (reboundPoint.y >= pad.pos.y - this.rad && reboundPoint.y <= pad.pos.y + pad.height + this.rad)
					this.bounce(reboundPoint, pad);
				else
					this.bounceCanvas();
			}
			else if (this.pos.x - this.rad >= pad.pos.x && this.pos.x + this.rad <= pad.pos.x + pad.width
				&& this.pos.y >= pad.pos.y - this.rad && this.pos.y <= pad.pos.y + pad.height + this.rad) {
			this.bounceInside(this.pos, pad);
			}
			else
				this.bounceCanvas();
		}
<<<<<<< HEAD
>>>>>>> e49b0be71c731891f628bf5b7f183a3d91df2ca6
=======
>>>>>>> 713711a906f5e375bf231914628f952534ee7b50
    }
}