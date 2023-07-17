import { Point } from "./Point";

export class Paddle {
	public pos: Point = new Point(0, 0);
	public readonly width: number;
	public readonly height: number;

	private lastUpdate: number = (new Date()).getTime();	

	constructor(side: "home" | "away") {	
		this.height = 100;
		this.width = 4;
		
		if (side === "home") this.pos = new Point(40, 350);
		else if (side === "away") this.pos = new Point(760 - this.width, 350);
	}

	public isCheatedPosition(pos: Point): boolean {
		const now = (new Date()).getTime();
		
		if (pos.y !== this.pos.y || now - this.lastUpdate < 10 || Math.abs(pos.x - this.pos.x) > 40)
			return (true);
		return (false);
	}

	public newPosition(pos: Point): void {
		this.lastUpdate = (new Date()).getTime();

		this.pos = pos;
	}
}
