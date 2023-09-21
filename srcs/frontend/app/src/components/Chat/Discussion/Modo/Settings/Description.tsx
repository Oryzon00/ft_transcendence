import { useEffect } from "react";

type DescriptionType = {
	value: string;
	setValue: any;
};

function Description({ value, setValue }: DescriptionType) {
	useEffect(() => {
		console.log(value);
	}, []);
	return (
		<div className="flex flex-col justify-center">
			<h2>Description : </h2>
			<textarea
				className="bg-[#424549] max-w-[80%] max-h-[20%]"
				value={value}
				onChange={(e) => {
					setValue(e.target.value);
				}}
			/>
		</div>
	);
}

export default Description;
