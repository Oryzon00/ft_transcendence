type NameType = {
	name: string;
	setName: any;
};

function Name({ name, setName }: NameType) {
	return (
		<div>
			<h2>Name Room : </h2>
			<input
				type="text"
				className="bg-[#424549] rounded-sm w-72 h-6"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
		</div>
	);
}

export default Name;
