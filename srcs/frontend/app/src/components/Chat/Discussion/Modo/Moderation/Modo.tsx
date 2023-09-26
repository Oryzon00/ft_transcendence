import apiAddress from "../../../../../utils/apiAddress";
import getJwtTokenFromCookie from "../../../../../utils/getJWT";
import { notifyError } from "../../../../../utils/notify";

type ModoType = {
    id: number;
    channelId: string;
}

function Modo({id, channelId}: ModoType) {

    const changeModo = () => {
        fetch(apiAddress + '/chat/modo/change', {
			method: "PATCH",
			headers: {
				Authorization: "Bearer " + getJwtTokenFromCookie(),
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ userId: id, channelId: channelId })
    })
			.then(function (res: Response) {
				if (!res.ok) {
					throw new Error("Request failed with status " + res.status);
				}
			})
			.catch(function (error) {
				notifyError(error.message);
			});

    }

    return (
        <button className="bg-[#282b30]" onClick={() => {changeModo()}}>
            <svg fill="#ffffff" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 232.211 232.211"  enable-background="new 0 0 232.211 232.211" width="32px" height="32px">
                <path d="M218.006,180.449l14.205-134.226L166.438,68.03L115.598,3.56L64.79,67.989L0,46.174l13.074,134.275H218.006z M75.255,103.169l40.343-51.16l40.311,51.119l41.572-13.783l-6.467,61.104H40.295L34.35,89.395L75.255,103.169z" /> <rect width="207.825" x="11.853" y="198.651" height="30" />
              </svg>
        </button>
    )
}

export default Modo;