function isEmptyString(str: string) {
	return str === null || str === undefined || str.trim().length === 0;
}

function Auth() {
	if (!isEmptyString(document.cookie)) {
		let login = decodeURIComponent(document.cookie).split("=")[1];
		console.log(login);
		return (
			<div>
				<button>Authentified as: {login}</button>
			</div>
		);
	}

	return (
		<div>
			<form method="get" action="https://api.intra.42.fr/oauth/authorize">
				<input
					type="hidden"
					name="client_id"
					value="u-s4t2ud-cffa8a7def1804e4f9b3265068605197c756e7a8beff3450a17722f02f1d15e0"
				/>
				<input
					type="hidden"
					name="redirect_uri"
					value="http://localhost:8000/auth"
				/>
				<input type="hidden" name="response_type" value="code" />
				<button type="submit">Auth to 42</button>
			</form>
		</div>
	);
}

export default Auth;
