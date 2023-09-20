import Bottom from "./Bottom"
import Header from "../Header"
import Photo from "./Photo"
import InputRoomName from "./InputRoomName"

type CustomizeType = {
	setPosition: any;
	result: string;
	setResult: any;
	previous: number;
};

function Customize({setPosition, previous, result, setResult}: CustomizeType) {
	return (
		<div className="h-full w-full rounded-sm">
			<div className="flex flex-col justify-between h-[60%]">
				<Header title="Customize your room" description="Give the look you want at your new room with a name and an icon. You can still modify it later."/>
				<Photo/>
				<InputRoomName result={result} setResult={setResult}/>
				<Bottom previous={previous} setPosition={setPosition}/>
			</div>
		</div>
	);
}

export default Customize;
