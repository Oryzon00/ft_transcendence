import { useContext, useEffect, useRef, useState } from "react";
import { ClientEvents, Listener, ServerEvents } from "../../routes/Play/types";
import { ServerPayload } from "../../routes/Play/ServerPayload";
import SocketWrapper, { SocketWrapperContext } from "../../routes/Play/SocketWrapper";
import { Point } from "../../routes/Play/ServerPayload";

class GameInfo {
	lobbyId: string = '';
	lobbyMode: "PvP" | "PvE" | undefined = undefined;
	hasStarted: boolean = false;
	hasFinished: boolean = false;
	isPaused: boolean = false;
	playersCount: number = 0;
	gameWidth: number = 800;
	gameHeight: number = 800;
	ballPosition: Point = {x: 400, y: 400};
	myPad: Point | undefined = {x: 40, y: 350};
	OpponentPad: Point | undefined = {x: 756, y: 350};
	myScore: number | undefined = 0;
	OpponentScore: number | undefined = 0;
}

function Pong() {
	const sm: SocketWrapper = useContext(SocketWrapperContext);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [GameState] = useState<GameInfo>(new GameInfo());
	const clientId : string | null = sm.getSocketId();


	function readServerPayload(data: ServerPayload[ServerEvents.LobbyState]) {
		if (GameState)
		{
			GameState.lobbyId = data.lobbyId;
			GameState.ballPosition = data.ballPosition;
			GameState.gameHeight = data.gameHeight;
			GameState.gameWidth = data.gameWidth;
			GameState.hasFinished = data.hasFinished;
			GameState.isPaused = data.isPaused;
			GameState.hasStarted = data.hasStarted;
			GameState.playersCount = data.playersCount;
			GameState.lobbyMode = data.lobbyMode;
			// console.log(data.scores);
			for (let [Id, value] of Object.entries(data.scores)) {
				if (Id === clientId) {
					GameState.myScore = value;
				} else {
					GameState.OpponentScore = value;
				}
			}
			for (let [Id, value] of Object.entries(data.padPositions)) {
				if (Id === clientId) {
					GameState.myPad = value.pos;
				} else {
					GameState.OpponentPad = value.pos;
				}
			}
		}	
	}

	function draw() {
		if (canvasRef.current) {
			// get new drawing context
			const renderCtx : CanvasRenderingContext2D | null = canvasRef.current.getContext("2d");

			function drawPaddles(ctx: CanvasRenderingContext2D) {
				ctx.fillStyle = "white";
				if (GameState.OpponentPad && GameState.myPad) {
					ctx.fillRect(GameState.OpponentPad.x, GameState.OpponentPad.y, 4, 100);
					ctx.fillRect(GameState.myPad.x, GameState.myPad.y, 4, 100);
				}
			}

			function drawNet(ctx: CanvasRenderingContext2D) {
				ctx.fillStyle = "#404040";
				for (let i: number = 0; i < 33; i++) {
					if (i % 2)
						ctx.fillRect( 800 / 2 - 3, i * 800 * 0.03, 6, 800 * 0.03);
				}
			}

			function drawBall(ctx: CanvasRenderingContext2D) {
				ctx.fillStyle = "white";
				ctx.beginPath();
				ctx.arc(GameState.ballPosition.x, GameState.ballPosition.y, 7, 0, 2 * Math.PI);
				ctx.fill();
				ctx.closePath();
			}

			function drawScore(ctx: CanvasRenderingContext2D) {
				ctx.fillStyle = "white";
				ctx.font = "40px Sans";
				ctx.textAlign = "center";
				ctx.fillText(GameState.myScore + "     " + GameState.OpponentScore, 800 / 2, 50);
			}

			if (renderCtx) {
				renderCtx.fillStyle = "#000000";
				renderCtx.fillRect(0, 0, 800, 800);
				drawPaddles(renderCtx);
				drawNet(renderCtx);
				drawBall(renderCtx);
				drawScore(renderCtx);
			}
		}
	}

	useEffect(() => {

		function onMove(pos: Point) {
			if (GameState && GameState.myPad)
				sm.emit({
					  event: ClientEvents.MovePaddle,
					  data: {
						clientId: sm.getSocketId(),
						padPosition: pos,
					},
				});
		};

		function keyPressHandler(e: KeyboardEvent) {
			if (e.key === "Up" || e.key === "ArrowUp") {
				if (GameState && GameState.myPad)
					onMove({x: GameState.myPad.x, y: GameState.myPad.y - 20})
				e.preventDefault();
			}
			if (e.key === "Down" || e.key === "ArrowDown") {
				if (GameState && GameState.myPad)
					onMove({x: GameState.myPad.x, y: GameState.myPad.y + 20})
				e.preventDefault();
			}
		}

		// function keyReleaseHandler(e: KeyboardEvent) {
		// 	if (e.key === "Up" || e.key === "ArrowUp") return;
		// 	if (e.key === "Down" || e.key === "ArrowDown") return;
			
		// }

		const onLobbyState: Listener<ServerPayload[ServerEvents.LobbyState]> = (data : ServerPayload[ServerEvents.LobbyState]) => {
			// const iter = data.padPositions.entries();
			
			// console.log(iter.next().value);
			// console.log(iter.next().value);
			console.log(data.padPositions[sm.getSocketId()]);
			readServerPayload(data);
			draw();
		};

		sm.addListener(ServerEvents.LobbyState, onLobbyState);
		window.addEventListener("keydown", keyPressHandler, false);
		// window.addEventListener("keyup", keyReleaseHandler, false);

		return () => {
			sm.removeListener(ServerEvents.LobbyState, onLobbyState);
			window.removeEventListener("keydown", keyPressHandler);
			// window.removeEventListener("keyup", keyReleaseHandler);
		};
	}, []);

return (
	<div>
		<canvas ref={canvasRef} width={800} height={800} />
	</div>
);
}

export default Pong;