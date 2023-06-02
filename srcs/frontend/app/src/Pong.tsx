import {
	useEffect,
	useCallback,
	useLayoutEffect,
	useRef,
	useState
} from "react";
import "./App.css";
import * as React from "react";

interface PongProps {
	canvasWidth: number;
	canvasHeight: number;
	padWidth: number;
	padHeight: number;
	ballRad: number;
	user1: string;
	user2: string;
}

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
}

interface Point {
	x: number;
	y: number;
}

function disableScroll() {
	document.body.classList.add("stop-scrolling");
}

function enableScroll() {
	document.body.classList.remove("stop-scrolling");
}

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
		height: padHeight
	});
	const [lPad, setrPad] = useState<Paddle>({
		pos: { x: canvasWidth * 0.05, y: (canvasHeight - padHeight) / 2 },
		width: padWidth,
		height: padHeight
	});
	const [ball, setBall] = useState<Ball>({
		pos: { x: canvasWidth / 2, y: canvasHeight / 2 },
		speedX: 0.5,
		speedY: 0.3,
		rad: ballRad
	});
	let upMove: boolean = false;
	let downMove: boolean = false;

	function drawPaddle(ctx: CanvasRenderingContext2D, pad: Paddle) {
		ctx.fillStyle = "white";
		ctx.fillRect(pad.pos.x, pad.pos.y, pad.width, pad.height);
	}

	function drawBall(ctx: CanvasRenderingContext2D, ball: Ball) {
		ctx.fillStyle = "white";
		ctx.beginPath();
		ctx.arc(ball.pos.x, ball.pos.y, ball.rad, 0, 2 * Math.PI);
		ctx.fill();
		ball.pos.x += ball.speedX;
		ball.pos.y += ball.speedY;
		if (
			ball.pos.x + ball.speedX > canvasWidth - ball.rad ||
			ball.pos.x + ball.speedX < ball.rad
		) {
			ball.speedX = -ball.speedX;
		}
		if (
			ball.pos.y + ball.speedY > canvasHeight - ball.rad ||
			ball.pos.y + ball.speedY < ball.rad
		) {
			ball.speedY = -ball.speedY;
		}
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

	function playerScore(
		ctx: CanvasRenderingContext2D,
		u1: string,
		u2: string
	) {
		ctx.fillStyle = "white";
		ctx.font = "20px Sans";
		ctx.textAlign = "center";
		ctx.fillText(u1 + "   " + u2, canvasWidth / 2, 50);
	}

	function updatePaddle(myPad: Paddle) {
		if (upMove) myPad.pos.y = Math.max(myPad.pos.y - 8, 0);
		if (downMove)
			myPad.pos.y = Math.min(
				myPad.pos.y + 8,
				canvasHeight - myPad.height
			);
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
				updatePaddle(lPad);
				playerScore(renderCtx, user1, user2);
				// console.log('speedX: %d speedY %d', ball.speedX, ball.speedY);
			}
		}
	}

	useEffect(() => {
		function keyPressHandler(e: KeyboardEvent) {
			e.preventDefault();
			if (e.key === "Up" || e.key === "ArrowUp") {
				upMove = true;
			} else if (e.key === "Down" || e.key === "ArrowDown") {
				downMove = true;
			}
			console.log("lol");
		}

		function keyReleaseHandler(e: KeyboardEvent) {
			e.preventDefault();
			if (e.key === "Up" || e.key === "ArrowUp") {
				upMove = false;
			} else if (e.key === "Down" || e.key === "ArrowDown") {
				downMove = false;
			}
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
