type StatusType = {
	status: string;
	setStatus: any;
	password: string;
	setPassword: any;
};

function Status({ status, setStatus, password, setPassword }: StatusType) {
	return (
		<div>
			<select name="selectedStatus" defaultValue={status}>
				<option value="public" onClick={setStatus("public")}>
					Public
				</option>
				<option value="private" onClick={setStatus("private")}>
					Private
				</option>
				<option value="protect" onClick={setStatus("protect")}>
					Protect
				</option>
			</select>
			{status == "protect" ? (
				<div>
					<h2>Password :</h2>
					<input
						type="password"
						value={password}
						className="bg-[#424549] rounded-sm w-72 h-6 text-base"
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
				</div>
			) : null}
		</div>
	);
}

export default Status;
