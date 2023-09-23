import apiAddress from "../../../../../utils/apiAddress";
import getJwtTokenFromCookie from "../../../../../utils/getJWT";
import { notifyError } from "../../../../../utils/notify";

type KickType = {
	id: number;
	channelId: string;
};

function Kick({ id, channelId }: KickType) {
	const kickFetch = () => {
		fetch(apiAddress + "/chat/channel/kick", {
			method: "PATCH",
			headers: {
				Authorization: "Bearer " + getJwtTokenFromCookie(),
				"Content-type": "application/json"
			},
			body: JSON.stringify({ id: channelId, invited: id })
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
	return (
		<button onClick={kickFetch} className="bg-[#282b30]">
			<svg
				fill="#ffffff"
				viewBox="0 0 512 512"
				enable-background="new 0 0 512 512"
				xmlns="http://www.w3.org/2000/svg"
				stroke="#ffffff"
				width="32px"
				height="32px"
			>
				<rect
					height="10.001"
					transform="matrix(0.7197 0.6943 -0.6943 0.7197 311.851 -7.1505)"
					width="13.07"
					x="158.247"
					y="377.667"
				></rect>
				<path d="M44.485,241.19c-0.778,3.29-0.323,6.854,1.28,10.036s4.197,5.668,7.305,7c1.609,0.689,3.296,1.033,4.956,1.033 c1.805,0,3.579-0.406,5.188-1.217l2.56-1.289l4.693,9.479l-2.936,1.479c-6.161,3.105-8.36,11.217-4.901,18.08 c1.604,3.182,4.197,5.668,7.305,7c1.609,0.689,3.296,1.033,4.956,1.033c1.805,0,3.579-0.406,5.188-1.217l2.759-1.391l4.742,9.578 l-2.939,1.48c-6.162,3.105-8.361,11.215-4.902,18.08c1.604,3.182,4.197,5.666,7.305,6.998c1.609,0.691,3.296,1.035,4.956,1.035 c1.805,0,3.579-0.406,5.188-1.217l2.764-1.393l27.982,56.518l0.385,0.779l3.08,2.967l-1.849,1.896 c-4.816,4.939-4.26,13.324,1.243,18.691c2.9,2.828,6.604,4.262,10.165,4.262c3.194,0,6.273-1.154,8.552-3.49l1.963-2.014 l10.22,9.848l-2.06,2.109c-4.821,4.938-4.27,13.322,1.229,18.691c2.549,2.49,5.81,4,9.181,4.252 c0.326,0.023,0.65,0.035,0.974,0.035c3.283,0,6.362-1.248,8.562-3.502l2.189-2.24l0.416,0.4c3.782,3.645,8.18,6.441,12.945,8.309 l0.016,5.285c0.003,0.846,0.102,1.674,0.283,2.473H94.94v10h114.131c0.016,0,0.031,0,0.047,0h117.936v-10H222.734 c0.191-0.836,0.289-1.691,0.286-2.555l-0.007-2.5h26.169c6.384,0,11.577-5.193,11.577-11.576v-7.033 c0-20.842-13.067-36.367-31.64-38.438l-7.687-46.484h10.562v-10h-9.462l1.384-11.334h11.078v-10h-9.858l1.384-11.332h10.141v-10 h-8.92l1.383-11.334h10.204v-10h-8.983l3.319-27.2c0.388-3.171-0.007-6.333-1.079-9.243L403.857,92.585l-6.313-7.755 l-89.949,73.229l-47.583-59.863l70.334-61.552l-6.586-7.525L180.009,154.921l-0.241-0.313c-2.642-3.425-7.367-4.512-11.237-2.582 L65.823,203.233c-10.906,4.748-16.302,17.354-12.327,28.489l-2.827,1.425C47.581,234.703,45.327,237.635,44.485,241.19z M58.714,249.113c-0.609,0.308-1.33,0.083-1.703-0.078c-0.934-0.4-1.777-1.242-2.315-2.309c-0.537-1.067-0.712-2.246-0.479-3.234 c0.094-0.397,0.343-1.108,0.952-1.416l2.672-1.346l3.495,7.061L58.714,249.113z M75.578,283.676 c-0.61,0.307-1.328,0.084-1.703-0.076c-0.934-0.4-1.777-1.242-2.315-2.309c-1.015-2.014-0.587-4.115,0.473-4.65l2.872-1.445 l3.495,7.059L75.578,283.676z M92.686,318.24c-0.609,0.309-1.33,0.084-1.703-0.076c-0.934-0.4-1.777-1.242-2.315-2.309 c-1.015-2.014-0.587-4.115,0.473-4.65l2.876-1.449l3.496,7.061L92.686,318.24z M97.267,297.822l0.639-4.096 c4.762-30.496,1.134-61.558-10.442-90.108l24.006-11.968c1.095,20.161,5.526,39.84,13.234,58.628l2.124,5.175 c16.214,39.519,20.324,82.179,12.017,123.878l-2.336-2.252L97.267,297.822z M142.348,400.42c-0.831,0.85-2.963,0.623-4.575-0.949 c-1.614-1.574-1.894-3.701-1.064-4.551l1.89-1.938l5.672,5.467L142.348,400.42z M172.422,429.836 c-0.476,0.488-1.231,0.51-1.636,0.48c-1.013-0.076-2.084-0.598-2.939-1.434c-1.613-1.574-1.891-3.701-1.062-4.551l2.106-2.156 l5.674,5.467L172.422,429.836z M213.021,448.523c0.002,0.682-0.52,1.225-0.831,1.488c-0.775,0.656-1.905,1.033-3.101,1.037 c-0.006,0-0.012,0-0.018,0c-2.245,0-3.925-1.318-3.929-2.502l-0.008-2.799c1.435,0.156,2.882,0.246,4.344,0.246h3.535 L213.021,448.523z M183.586,176.162c2.209-1.324,3.754-3.528,4.244-6.059c0.493-2.547-0.129-5.185-1.706-7.244l45.385-39.719 l46.617,58.911l-51.28,41.747c-4.866-4.147-11.436-5.699-17.65-4.142l-6.271,1.571c-11.942,2.991-24.388-3.372-28.957-14.8 C168.674,193.185,171.729,183.566,183.586,176.162z M299.841,164.373l-13.959,11.364l-46.838-59.19l13.435-11.757L299.841,164.373 z M172.312,161.316l5.258,6.822c-15.207,9.863-19.785,24.746-12.887,42.001c6.418,16.053,23.901,24.989,40.673,20.789l6.271-1.571 c3.176-0.796,6.411-0.01,8.869,2.16c2.458,2.17,3.64,5.281,3.243,8.535l-3.468,28.412h-15.942v10h14.722l-1.383,11.334h-13.339v10 h12.118l-1.383,11.332h-10.735v10h9.515l-1.383,11.334h-8.132v10h6.971l9.3,56.248h4.241c11.22,0,20.14,6.732,23.936,17.064 h-33.444c-5.226,0-10.314-1.822-14.351-5.137l-20.121-19.41l-6.943,7.197l20.258,19.541l0.27,0.242 c5.852,4.879,13.27,7.566,20.888,7.566h35.393c0.023,0.531,0.036,1.068,0.036,1.609v7.033c0,0.869-0.707,1.576-1.577,1.576 h-39.704c-7.632,0-14.862-2.918-20.357-8.213l-41.804-40.283c10.401-45.598,6.534-92.523-11.238-135.84l-2.124-5.175 c-7.833-19.092-12.087-39.159-12.684-59.719L172.312,161.316z M69.895,212.368l0.136-0.058l8.461-4.218 c9.361,23.41,13.048,48.59,10.805,73.635l-26.283-53.086C60.581,222.309,63.64,215.039,69.895,212.368z"></path>{" "}
				<polygon points="185.216,340.055 195.886,377.145 205.495,374.379 195.165,338.469 191.688,241.701 181.693,242.06 185.193,339.441 "></polygon>{" "}
				<path d="M305.289,251.904c-42.081,28.252-53.332,85.475-25.079,127.557c17.72,26.393,46.827,40.658,76.456,40.654 c17.611,0,35.412-5.043,51.101-15.576c42.081-28.254,53.332-85.475,25.079-127.557 C404.594,234.902,347.371,223.651,305.289,251.904z M424.543,282.557c2.695,4.016,4.963,8.191,6.861,12.467l-16.453-6.027 l0.651-17.531C418.845,274.844,421.845,278.539,424.543,282.557z M405.915,262.863l-0.998,26.848l-28.498,19.133l-26.674-9.773 l-22.735-25.152l9.189-25.057c6.657-1.698,13.445-2.537,20.205-2.537C374.086,246.324,391.558,252.034,405.915,262.863z M351.434,310.338l20.527,7.521l-0.81,21.848l-21.122-7.123L351.434,310.338z M310.863,260.207 c4.231-2.842,8.638-5.228,13.157-7.184l-6.19,16.879l-18.126-0.67C303.104,265.961,306.813,262.926,310.863,260.207z M291.119,278.922l27.865,1.029l22.758,25.178l-1.778,28.191L303.2,358.002l-26.046-9.541 C271.056,324.449,276.214,298.736,291.119,278.922z M288.513,373.887c-2.861-4.262-5.244-8.703-7.207-13.256l17.435,6.389 l-0.689,18.582C294.56,382.027,291.357,378.123,288.513,373.887z M340.724,408.605c-12.136-2.387-23.334-7.365-32.981-14.523 l1.032-27.777l36.763-24.682l26.767,9.025l14.688,30.596l-9.616,26.23C365.547,410.596,353.076,411.033,340.724,408.605z M402.192,396.236c-4.027,2.705-8.243,5.002-12.588,6.93l6.25-17.049l17.944,0.66C410.28,390.217,406.421,393.398,402.192,396.236 z M422.271,377.082l-26.657-0.98l-14.673-30.568l1.052-28.387l28.498-19.133l25.211,9.234 C442.049,331.291,437.073,357.127,422.271,377.082z"></path>{" "}
				<rect height="10" width="78.667" x="389.219" y="451.049"></rect>
				<rect height="10" width="22.354" x="346.864" y="451.049"></rect>
				<rect height="10" width="26.144" x="49.116" y="451.049"></rect>
				<rect height="10" width="48.516" x="67.675" y="472.881"></rect>
				<rect height="10" width="26.229" x="138.553" y="472.881"></rect>
				<rect
					height="10"
					width="185.041"
					x="215.66"
					y="472.881"
				></rect>{" "}
				<rect height="10" width="25.043" x="424.843" y="472.881"></rect>
			</svg>
		</button>
	);
}

export default Kick;
