type BottomType = {
    setPosition: any;
    password: string;
}

function Bottom({setPosition, password} : BottomType) {
    const bottom_button_style = "bg-[#eaecee] text-black my-auto w-24 h-12"
    const advance = ['Skip', 'Next'];

    return (
			<div
				id="bottom"
				className="absolute w-full h-[18%] bottom-0 inset-x-0 bg-[#eaecee] flex justify-between"
			>
				<button className={bottom_button_style + " ml-4"} onClick={() => setPosition(0)}>
					Back
				</button>
				<button className={bottom_button_style + " mr-4"} onClick={() => setPosition(2)}>
                    {(password == '') ? advance[0] : advance[1]}
				</button>
			</div>
    );
}

export default Bottom;