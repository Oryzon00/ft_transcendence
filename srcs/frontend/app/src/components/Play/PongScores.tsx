import { useEffect, useState } from 'react'
import './PongScores.styles.css'

interface PongScoresProps {
	side: Boolean,
	myScore: number,
	OpponentScore: number,
}

export function PongScores({side, myScore, OpponentScore}: PongScoresProps) {
	const [spanLeftText, setSpanLeftText] = useState<string>('');
	const [spanRightText, setSpanRightText] = useState<string>('');

	useEffect(() => {
		console.log("pong scores:" + myScore + " " + OpponentScore);
		setSpanLeftText(side === false ? "Your Score : " + myScore : "Opponent Score : " + OpponentScore);
		setSpanRightText(side === true ? "Your Score : " + myScore : "Opponent Score : " + OpponentScore);
	},[myScore, OpponentScore]);

	return(
		<div className="PongScores">
			<span>{spanLeftText}</span>
			<span>{spanRightText}</span>
		</div>
	)
}