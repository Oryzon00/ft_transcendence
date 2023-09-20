import { useEffect, useState } from 'react'
import './PongScores.styles.css'

interface PongScoresProps {
	player1: string,
	score1: number,
	player2: string,
	score2: number,
}

export function PongScores({player1, score1, player2, score2}: PongScoresProps) {

	return(
		<div className="PongScores">
			<span>{player1} : {score1}</span>
			<span>{player2} : {score2}</span>
		</div>
	)
}