import { Point } from "./Point";

export class Paddle {
	public pos: Point;
	public upKey: Boolean = false;
	public downKey: Boolean = false;
	public readonly width: number;
	public readonly height: number;

	private lastUpdate: number = (new Date()).getTime();	

	constructor(side: "home" | "away") {	
		this.height = 100;
		this.width = 4;
		
		if (side === "home") this.pos = new Point(40, 350);
		else if (side === "away") this.pos = new Point(760 - this.width, 350);
	}

	public isCheatedPosition(key: string): boolean {
		const now = (new Date()).getTime();

		if (now - this.lastUpdate < 10 || (key !== "UpPress" && key !== "DownPress" && key !== "UpRelease" && key !== "DownRelease"))
			return (true);
		return (false);
	}

	public newPosition(key: string): void {
		this.lastUpdate = (new Date()).getTime();
		switch(key)
		{
			case "UpPress": 
				this.upKey = true;
				break;
			case "UpRelease":
				this.upKey = false;
				break;
			case "DownPress":
				this.downKey = true;
				break;
			case "DownRelease":
				this.downKey = false;
				break;
		}
	}
}
