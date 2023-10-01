import apiAddress from "../../../../../utils/apiAddress";
import getJwtTokenFromCookie from "../../../../../utils/getJWT";
import { notifyError } from "../../../../../utils/notify";

type UnbanType = {
	banId: string;
	channelId: string;
};

function Unban({ banId, channelId }: UnbanType) {
	const fetchUnBan = () => {
		fetch(apiAddress + "/chat/channel/unban", {
			method: "PATCH",
			headers: {
				Authorization: "Bearer " + getJwtTokenFromCookie(),
				"Content-type": "application/json"
			},
			body: JSON.stringify({ id: banId, channelId: channelId })
		})
			.then(function (res: Response) {
				if (!res.ok) {
					throw new Error("Couldn't unban");
				}
			})
			.catch(function (error) {
				notifyError(error.message);
			});
	};

	return (
		<button
			onClick={() => {
				fetchUnBan();
			}}
			className="bg-[#282b30]"
		>
			<svg
				fill="#92400e"
				width="32px"
				height="32px"
				viewBox="0 0 512 512"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M256 8C119.034 8 8 119.033 8 256s111.034 248 248 248 248-111.034 248-248S392.967 8 256 8zm130.108 117.892c65.448 65.448 70 165.481 20.677 235.637L150.47 105.216c70.204-49.356 170.226-44.735 235.638 20.676zM125.892 386.108c-65.448-65.448-70-165.481-20.677-235.637L361.53 406.784c-70.203 49.356-170.226 44.736-235.638-20.676z" />
			</svg>
		</button>
	);
}

export default Unban;
