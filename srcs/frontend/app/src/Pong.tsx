import {
	useEffect,
	useCallback,
	useLayoutEffect,
	useRef,
	useState
} from "react";
import "./App.css";
import * as React from "react";
import Ball  from "./Ball";
import Paddle from "./Paddle";

interface PongProps {
	canvasWidth: number;
	canvasHeight: number;
	padWidth: number;
	padHeight: number;
	ballRad: number;
	user1: number;
	user2: number;
}

<<<<<<< HEAD
interface Ball {
	pos: Point;
	speedX: number;
	speedY: number;
	rad: number;
}

interface Paddle {
	pos: Point;
	width: number;
	height: number;
	up: boolean;
	down: boolean;
}

interface Point {
	x: number;
	y: number;
}

function bresenhamAlgorithm(start: Point, end: Point): Array<Point> { 

    const deltaX = Math.abs(end.x - start.x) // zero or positive number
    const deltaY = Math.abs(end.y - start.y) // zero or positive number
    
    let point: Point = start;
    
    const horizontalStep: number = (start.x < end.x) ? 1 : -1;
    const verticalStep: number = (start.y < end.y) ? 1 : -1;
    
    const points: Array<Point> = Array<Point>(start);
    
    let difference: number = deltaX - deltaY;
    
    while (true) {
    
        const doubleDifference = 2 * difference // necessary to store this value
        
        if (doubleDifference > -deltaY) { difference -= deltaY; point.x += horizontalStep }
        if (doubleDifference <  deltaX) { difference += deltaX; point.y += verticalStep }
    
        if ((point.x == end.x) && (point.y == end.y)) { break } // doesnt include the end point
        
        points.push(point);
    }    
    
    return (points);
}

function multiplePosSpeed(start: Point, speedX: number, speedY: number): Array<Point> {
	let points: Array<Point> = Array<Point>();

	for(let i : number = 0; i < 50; i++)
	{
		points.push({x: start.x + 0.02 * i * speedX, y: start.y + 0.02 * i * speedY});
	}
	return (points);
}

function intersects(ball: Ball, pad: Paddle): boolean
{
    let testX: number = ball.pos.x;
    let testY: number = ball.pos.y;

	if (ball.pos.x < pad.pos.x) { testX = pad.pos.x}
	else if (ball.pos.x > pad.pos.x + pad.width) { testX = pad.pos.x + pad.width }

	if (ball.pos.y < pad.pos.y) { testY = pad.pos.y}
	else if (ball.pos.y > pad.pos.y + pad.height) { testY = pad.pos.y + pad.height }
	

	return (Math.sqrt( Math.pow(ball.pos.x - testX, 2) + Math.pow(ball.pos.y - testY, 2)) <= ball.rad);
}

function collisionDetectionBallPaddle(ball: Ball, pad: Paddle): Point | false {
	let i: 				number		 = 0;
	// let points: 		Array<Point> = bresenhamAlgorithm(ball.pos, {x: ball.pos.x + ball.speedX, y: ball.pos.y + ball.speedY});
	let points: 		Array<Point> = multiplePosSpeed(ball.pos, ball.speedX, ball.speedY);
	let tmpBall: 		Ball		 = ball;
	let intersection: 	boolean		 = intersects(tmpBall, pad);

	while (!intersection && i < points.length)
	{
		tmpBall.pos = points[i++];
		intersection = intersects(tmpBall, pad);
	}
	return (intersection ? tmpBall.pos : false);
}

=======
>>>>>>> e49b0be71c731891f628bf5b7f183a3d91df2ca6
export default function Pong({
	canvasWidth,
	canvasHeight,
	padWidth,
	padHeight,
	ballRad,
	user1,
	user2
}: PongProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [context, setContext] = useState<CanvasRenderingContext2D | null>(
		null
	);
	const [rPad, setlPad] = useState<Paddle>({
		pos: {
			x: canvasWidth * 0.95 - padWidth,
			y: (canvasHeight - padHeight) / 2
		},
		width: padWidth,
		height: padHeight,
		up: false,
		down: false
	});
	const [lPad, setrPad] = useState<Paddle>({
		pos: { x: canvasWidth * 0.05, y: (canvasHeight - padHeight) / 2 },
		width: padWidth,
		height: padHeight,
		up: false,
		down: false
	});
<<<<<<< HEAD
	const [ball, setBall] = useState<Ball>({
		pos: { x: canvasWidth / 2, y: canvasHeight / 2 },
		speedX: (Math.random() > 0.5 ? 8 : -8),
		speedY:	/*-6 + Math.random() * 12*/ 0,
		rad: ballRad
	});
=======
	const [ball, setBall] = useState<Ball>(new Ball(canvasWidth, canvasHeight, ballRad));
>>>>>>> e49b0be71c731891f628bf5b7f183a3d91df2ca6

	function drawPaddle(ctx: CanvasRenderingContext2D, pad: Paddle) {
		ctx.fillStyle = "white";
		ctx.fillRect(pad.pos.x, pad.pos.y, pad.width, pad.height);
		updatePaddle(pad);
	}
	// change speedX and Y to angle + speed
	// fix edges paddle
	// tearing
	// 
	function updateBallTrajectory(ball: Ball) {
<<<<<<< HEAD
		// ball.pos.x += ball.speedX;
		// ball.pos.y += ball.speedY;
		// if (ball.pos.x + ball.speedX > lPad.pos.x + ball.rad && ball.pos.x + ball.speedX < lPad.pos.x + lPad.width + ball.rad && ball.pos.y <= lPad.pos.y + lPad.height && ball.pos.y >= lPad.pos.y)
		// {	
		// 	ball.speedX = -(ball.speedX - 0.7);
		// }
		// if (ball.pos.x + ball.speedX > rPad.pos.x - ball.rad && ball.pos.x + ball.speedX < rPad.pos.x - ball.rad + rPad.width && ball.pos.y <= rPad.pos.y + rPad.height && ball.pos.y >= rPad.pos.y)
		// {
		// 	ball.speedX = -(ball.speedX + 0.7);
		// }
		
		

		let collision: Point | false = false;

		if (ball.speedX > 0) {
			collision = collisionDetectionBallPaddle(ball, rPad);
		} else {
			collision = collisionDetectionBallPaddle(ball, lPad);
		}
		
		if (collision !== false){
			ball.pos = collision;
			// ball.speedX = (ball.speedX > 0) ? -(ball.speedX + 0.7) : -(ball.speedX - 0.7);
			ball.speedX *= -1;
			ball.pos.Y += ball.speedY;
		}
		else
		{
			ball.pos.x += ball.speedX;
			ball.pos.y += ball.speedY;
		}
		collision = false;
		if ( ball.pos.x + ball.speedX > canvasWidth - ball.rad || ball.pos.x + ball.speedX < ball.rad)
		{
			ball.pos.x = canvasWidth / 2;
			ball.pos.y = canvasHeight / 2;
			if (ball.speedX > 0) {
				ball.speedX = 29;
				user1++;
			}
			else {
				ball.speedX = -29;
				user2++;
			}
			ball.speedY = -6 + Math.random() * 12;		
		}
		if ( ball.pos.y + ball.speedY > canvasHeight - ball.rad 
			|| ball.pos.y + ball.speedY < ball.rad) 
		{
			ball.speedY = -ball.speedY;
		}
=======
		
		if ( ball.speed.angle > Math.PI / 2 || ball.speed.angle < -Math.PI / 2)
			ball.checkBounce(lPad);
		else
			ball.checkBounce(rPad);

		let score = ball.respawn();
		if (score === 'right') user1++;
		else if (score === 'left') user2++;
>>>>>>> e49b0be71c731891f628bf5b7f183a3d91df2ca6
	}


	function drawBall(ctx: CanvasRenderingContext2D, ball: Ball) {
		ctx.fillStyle = "#b32225";
		ctx.beginPath();
		ctx.arc(ball.pos.x, ball.pos.y, ball.rad, 0, 2 * Math.PI);
		ctx.fill();
		updateBallTrajectory(ball);
		ctx.closePath();
	}

	function drawNet(ctx: CanvasRenderingContext2D) {
		ctx.fillStyle = "#404040";
		for (let i: number = 0; i < 33; i++) {
			if (i % 2)
				ctx.fillRect(
					canvasWidth / 2 - 3,
					i * canvasHeight * 0.03,
					6,
					canvasHeight * 0.03
				);
		}
	}

	function playerScore(ctx: CanvasRenderingContext2D) 
	{
		ctx.fillStyle = "white";
		ctx.font = "40px Sans";
		ctx.textAlign = "center";
		ctx.fillText(user1 + "     " + user2, canvasWidth / 2, 50);
	}

	function updatePaddle(myPad: Paddle) {
		if (myPad.up) 
			myPad.pos.y = Math.max(myPad.pos.y - 18, 0);
		if (myPad.down)
			myPad.pos.y = Math.min(myPad.pos.y + 18, canvasHeight - myPad.height);
	}

	function draw() {
		if (canvasRef.current) {
			// get new drawing context
			const renderCtx = canvasRef.current.getContext("2d");

			if (renderCtx) {
				renderCtx.fillStyle = "#000000";
				renderCtx.fillRect(0, 0, canvasWidth, canvasHeight);
				drawPaddle(renderCtx, lPad);
				drawPaddle(renderCtx, rPad);
				drawNet(renderCtx);
				drawBall(renderCtx, ball);
				
				playerScore(renderCtx);
				// console.log('speedX: %d speedY %d', ball.speedX, ball.speedY);
			}
		}
	}

	useEffect(() => {
		function keyPressHandler(e: KeyboardEvent) {
			if (e.key === "Up" || e.key === "ArrowUp") {
				rPad.up = true;
				e.preventDefault();
			} 
			if (e.key === "Down" || e.key === "ArrowDown")
			{
				rPad.down = true;
				e.preventDefault();
			}
			if (e.key === "z")
				lPad.up = true;
			if (e.key === "s")
				lPad.down = true;
		}

		function keyReleaseHandler(e: KeyboardEvent) {
			if (e.key === "Up" || e.key === "ArrowUp")
				rPad.up = false;
			if (e.key === "Down" || e.key === "ArrowDown")
				rPad.down = false;
			if (e.key === "z")
				lPad.up = false;
			if (e.key === "s")
				lPad.down = false;
		}

		window.addEventListener("keydown", keyPressHandler, false);
		window.addEventListener("keyup", keyReleaseHandler, false);
		return () => {
			window.removeEventListener("keydown", keyPressHandler);
			window.removeEventListener("keyup", keyReleaseHandler);
		};
	}, []);

	setInterval(draw, 16);

	
	return (
		<>
			<canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />			
		</>
	);
}