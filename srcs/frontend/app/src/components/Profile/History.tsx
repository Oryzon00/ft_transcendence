function History ({user}: any) {
		const listHistory = user.gameProfile.history.map((game :any) => (
			<li key={game.id}>
				<div className={user.id == game.winner.user.id ? "game-component-WINNER" : "game-component-LOSER"}>
					<div>
						<span>{game.gamemode}</span>
					</div>
					<img src={game.winner.user.image} />
					<div>
						<span style={{color: "lightgreen"}}>{Math.max(...game.scores)}</span>
						/
						<span style={{color: "lightcoral"}}>{Math.min(...game.scores)}</span>
					</div>
					<img src={game.loser.user.image} />
					<div>
						<p>Time : </p>
						<span>{Math.floor(game.timerMS / 1000 / 60)} min {game.timerMS / 1000 % 60} sec</span>
					</div>
				</div>
			</li>
		));

	return (
		<div className="history-default">
			<ul>{listHistory}</ul>
		</div>
	)
}

export default History;