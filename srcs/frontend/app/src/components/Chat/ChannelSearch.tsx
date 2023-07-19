import { useNavigate } from "react-router";

export function ButtonChannelSearch() {
	const navigate = useNavigate();
    function goToCreationChannel() {
        navigate("/chat/channel/search");
    }
    return (
        <button onClick={goToCreationChannel}>
            Search Channel
        </button>
    );
}