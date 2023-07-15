import { useContext, useState } from "react";
import { UserContext } from "../../../utils/contexts/userContext.tsx";
import './UpdateProfilePictureButton.styles.css'
function updateProfilePictureButton() {
	const userHook = useContext(UserContext);
	const [test, setTest] = useState("")
	if (!userHook) return null;

	const handleChange = (event: any) => {
		let FR = new FileReader();
		FR.readAsDataURL(event.target.files[0]);
		FR.onload = () => {
			setTest(String(FR.result));
		}
	};
	return (
		<div className="UpdatePfpButton">
			<img src={userHook.user.image} />
			<input
				type="file"
				accept="image/*"
				onChange={handleChange}
			/>
			<img src={test} />
		</div>
	)
}

export default updateProfilePictureButton;