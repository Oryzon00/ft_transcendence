import './PongScores.styles.css'

interface PongScoresProps {
	side: Boolean,
	myScore: number,
	OpponentScore: number,
}

export function PongScores({side, myScore, OpponentScore}: PongScoresProps) {
	

	return(
		<div className="PongScores">
			<span>{side === false ? "Your Score : " : "Opponent Score : "}{side === false ? myScore : OpponentScore}</span>
			<span>{side === true ? "Your Score : " : "Opponent Score : "}{side === true ? myScore : OpponentScore}</span>
		</div>
	)
}