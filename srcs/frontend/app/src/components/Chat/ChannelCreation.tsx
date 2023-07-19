import { useNavigate } from "react-router";

export function ButtonChannelCreation() {
	const navigate = useNavigate();
    function goToCreationChannel() {
        navigate("/chat/channel/create");
    }
    return (
        <button onClick={goToCreationChannel}>
            Create Channel
        </button>
    );
}