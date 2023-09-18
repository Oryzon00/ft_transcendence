type InputType = {
	enter: string;
	setEnter: any;
	confirm: string;
	setConfirm: any;
};

function Input({ enter, setEnter, confirm, setConfirm }: InputType) {
	const header: string =
		"text-[#566573] text-xl text-left w-11/12 mx-auto mb-2text-[#566573] text-xl text-left w-11/12 mx-auto mb-2";
	const passcss: string =
		"bg-[#eaecee] w-11/12 h-8 rounded-sm text-black outline-none mx-auto";
	return (
		<div className="flex flex-col w-full h-2/5 justify-center items-center my-auto gap-12">
			<div className="w-full flex flex-col justify-center">
				<h3 className={header}>Password :</h3>
				<input
					type="password"
					className={passcss}
					value={enter}
					onChange={(e) => {
						setEnter(e.target.value);
					}}
				/>
			</div>
			<div className="w-full flex flex-col justify-center">
				<h3 className={header}>Confirm Password :</h3>
				<input
					type="password"
					className={passcss}
					value={confirm}
					onChange={(e) => {
						setConfirm(e.target.value);
					}}
				/>
			</div>
		</div>
	);
}

export default Input;
