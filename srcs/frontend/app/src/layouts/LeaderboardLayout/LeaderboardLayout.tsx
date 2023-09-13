import LeaderboardFirsts from "../../components/Leaderboard/LeaderboardFirsts";
import LeaderboardOthers from "../../components/Leaderboard/LeaderboardOthers";
import "./LeaderboardLayout.styles.css"

function LeaderboardLayout() {
	return (
		<div className="leaderboard-main">
			<LeaderboardFirsts />
			<span className="leaderboard-mc">Meow t'es trop Low Bebou Nyaa~</span>
			<LeaderboardOthers />
		</div>
	)
}

export default LeaderboardLayout;