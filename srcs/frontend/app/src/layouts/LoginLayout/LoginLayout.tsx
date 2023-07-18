import LoginButton from "../../components/Login/LoginButton";
import "./LoginLayout.styles.css";

function LoginLayout() {
	return (
		<div className="main-page">
			<div className="frame-1">
				<span className="text-1">
					Welcome to Transcendence
				</span>
				<span className="text-1" style={{ paddingBottom:5 +'vh' }}>
					Please sign in to continue
				</span>
				<LoginButton />
			</div>
		</div>
	);
}

export default LoginLayout;