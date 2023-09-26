import { useState } from "react";
import apiAddress from "../../../../../utils/apiAddress";
import getJwtTokenFromCookie from "../../../../../utils/getJWT";
import { notifyError } from "../../../../../utils/notify";

type MuteType = {
	id: number;
	channelId: string;
};

function Mute({ id, channelId }: MuteType) {
	const [isClicked, setClicked] = useState<boolean>(false);
	const MuteFetch = () => {
		fetch(apiAddress + "/chat/channel/ban", {
			method: "PATCH",
			headers: {
				Authorization: "Bearer " + getJwtTokenFromCookie(),
				"Content-type": "application/json"
			},
			body: JSON.stringify({ id: id, invited: channelId })
		})
			.then(function (res: Response) {
				if (!res.ok) {
					throw new Error("Request failed with status " + res.status);
				}
				return res.json();
			})
			.catch(function (error) {
				notifyError(error.message);
			});
	};
	return isClicked ? (
		<div className="flex">
			<div>
			<input type="time" name="time" placeholder="hrs:mins"/>
			<input type="date" />
			</div>
			<button>Mute</button>
		</div>
	) : (
		<button
			onClick={() => {
				setClicked(true);
			}}
			className="bg-[#282b30]"
		>
			<svg
				width="32px"
				height="32px"
				viewBox="0 0 24 24"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				fill="#282b30"
			>
				<path
					d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z"
					fill-rule="nonzero"
				></path>
				<path
					d="M13.2606,3.29924 C13.9570435,2.80181043 14.9125962,3.25635123 14.9943712,4.07982597 L15,4.19435 L15,19.8057 C15,20.6615 14.0747274,21.1749318 13.3570692,20.7627926 L13.2606,20.7008 L6.67953,16 L4,16 C2.94563773,16 2.08183483,15.18415 2.00548573,14.1492661 L2,14 L2,10 C2,8.94566636 2.81587733,8.08186477 3.85073759,8.00551573 L4,8.00003 L6.67953,8.00003 L13.2606,3.29924 Z M17.5858,9.17162 L19,10.5858 L20.4142,9.17163 C20.8047,8.7811 21.4379,8.7811 21.8284,9.17163 C22.2189,9.56215 22.2189,10.1953 21.8284,10.5858 L20.4142,12 L21.8284,13.4143 C22.2189,13.8048 22.2189,14.4379 21.8284,14.8285 C21.4379,15.219 20.8047,15.219 20.4142,14.8285 L19,13.4143 L17.5858,14.8285 C17.1952,15.219 16.5621,15.219 16.1716,14.8285 C15.781,14.438 15.781,13.8048 16.1716,13.4143 L17.5858,12 L16.1716,10.5858 C15.781,10.1953 15.781,9.56214 16.1716,9.17162 C16.5621,8.78109 17.1952,8.78109 17.5858,9.17162 Z"
					fill="#ffffff"
				></path>
			</svg>
		</button>
	);
}

export default Mute;
