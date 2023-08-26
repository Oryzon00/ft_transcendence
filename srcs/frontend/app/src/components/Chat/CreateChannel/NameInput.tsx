type NameInputType = {
	name: string;
	setName: any;
};

function NameInput({ name, setName }: NameInputType) {
	return (
		<div
			id="channel-name"
			className="flex justify-center items-center flex-col"
		>
			<h2>Name Channel</h2>
			<input
				type="text"
				value={name}
				placeholder="Enter a name"
				onChange={(e) => setName(e.target.value)}
			/>
		</div>
	);
}

export default NameInput;
