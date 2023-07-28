import { useState } from "react";
import { useNavigate } from "react-router";

export function SearchUserInput() {
	const [search, setSearch] = useState("");
	const navigate = useNavigate();
	function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
		setSearch(event.target.value);
	}
	function handleEnterKey(event: React.KeyboardEvent<HTMLInputElement>) {
		if (event.key == "Enter") {
			navigate("/profile/" + search);
			setSearch("");
		}
	}
	return (
		<input
			className="px-5 py-2 rounded-md"
			type="search"
			placeholder="Search for a user..."
			value={search}
			onKeyDown={handleEnterKey}
			onChange={handleSearch}
		></input>
	);
}
