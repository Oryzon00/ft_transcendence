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
	ballPosition: Point = {x: 0, y: 0};
	myPad: Point | undefined = {x: 0, y: 0};
	OpponentPad: Point | undefined = {x: 0, y: 0};
	myScore: number | undefined = 0;
	OpponentScore: number | undefined = 0;
}

function Pong() {
	const sm: SocketWrapper = useContext(SocketWrapperContext);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [GameState, setGameState] = useState(new GameInfo());
	const clientId : string | null = sm.getSocketId();


	function readServerPayload(data: ServerPayload[ServerEvents.LobbyState]) {
		if (GameState)
		{
			console.log("reading data");
			let NewGameState: GameInfo = new GameInfo();
			NewGameState.lobbyId = data.lobbyId;
			NewGameState.ballPosition = data.ballPosition;
			NewGameState.gameHeight = data.gameHeight;
			NewGameState.gameWidth = data.gameWidth;
			NewGameState.hasFinished = data.hasFinished;
			NewGameState.isPaused = data.isPaused;
			NewGameState.hasStarted = data.hasStarted;
			NewGameState.playersCount = data.playersCount;
			NewGameState.lobbyMode = data.lobbyMode;
			console.log(data.scores);
			for (let Id of data.scores.keys()) {
				if (Id === clientId) {
					NewGameState.myScore = data.scores.get(Id);
					NewGameState.myPad = data.padPositions.get(Id);
				} else {
					NewGameState.OpponentScore = data.scores.get(Id);
					NewGameState.OpponentPad = data.padPositions.get(Id);  
				}
			}
			setGameState(NewGameState);
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
		function keyPressHandler(e: KeyboardEvent) {
			if (e.key === "Up" || e.key === "ArrowUp") {
				sm.emit({
					event: ClientEvents.MovePaddle,
					data: {
						clientId: sm.getSocketId(),
						// padPosition: { x: GameState.myPad.x, y: GameState.myPad.y + 40},
				  },
			  });
				e.preventDefault();
			}
			if (e.key === "Down" || e.key === "ArrowDown") {
				sm.emit({
					event: ClientEvents.MovePaddle,
					data: {
						clientId: sm.getSocketId(),
						// padPosition: { x: GameState.myPad.x, y: GameState.myPad.y - 40},
				  },
			  });
				e.preventDefault();
			}
		}

		function keyReleaseHandler(e: KeyboardEvent) {
			if (e.key === "Up" || e.key === "ArrowUp") return;
			if (e.key === "Down" || e.key === "ArrowDown") return;
			
		}

		const onLobbyState: Listener<ServerPayload[ServerEvents.LobbyState]> = (data : ServerPayload[ServerEvents.LobbyState]) => {
			console.log(data.padPositions.entries().next().value);
			console.log(Array.from(data.padPositions.values()).pop());
			readServerPayload(data);
			draw();
		};

		sm.addListener(ServerEvents.LobbyState, onLobbyState);
		window.addEventListener("keydown", keyPressHandler, false);
		window.addEventListener("keyup", keyReleaseHandler, false);

		return () => {
			sm.removeListener(ServerEvents.LobbyState, onLobbyState);
			window.removeEventListener("keydown", keyPressHandler);
			window.removeEventListener("keyup", keyReleaseHandler);
		};
	}, []);

return (
	<div>
		<canvas ref={canvasRef} width={800} height={800} />
	</div>
);
}

export default Pong;