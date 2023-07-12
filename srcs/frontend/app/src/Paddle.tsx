import Point from './Point'

export default class Paddle {
	pos: Point = {x: 0, y: 0};
	width: number = 0;
	height: number = 0;
	up: boolean = false;
	down: boolean = false;
}
