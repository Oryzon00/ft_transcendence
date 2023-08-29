import CreateChannel from "./CreateChannel/CreateChannel";

type OverlayPopupType = {
	creation: boolean;
	togglecreation: any;
	community: boolean;
	togglecommunity: any;
};

function OverlayPopup({
	creation,
	togglecreation,
	community,
	togglecommunity
}: OverlayPopupType) {
	const overlay: string =
		"w-screen h-screen fixed top-0 left-0 bg-opacity-30 bg-[#313131cc] flex justify-center items-center";

	if (creation)
		return (
			<div className="flex justify-center items-center relative">
				<div className={overlay} onClick={togglecreation} />
				<div className="absolute left-1/2 translate-x-1/2">
					<CreateChannel togglemodal={togglecreation} />
				</div>
			</div>
		);
	if (community)
		return (
			<div className="flex justify-center items-center relative">
				<div className={overlay} onClick={togglecommunity} />
				<div className="absolute left-1/2 translate-x-1/2">
					<CreateChannel togglemodal={togglecommunity} />
				</div>
			</div>
		);
	return null;
}

export default OverlayPopup;
