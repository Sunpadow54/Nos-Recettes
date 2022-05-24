import { useState, useEffect } from "react";
/* Style */
import "./searchBar.scss";
/* Icons */
import { AiOutlineSearch } from "react-icons/ai";
/* Components */
import useFetch from "../../hooks/useFetch";

function SearchBar({ endpoint, setSearchResult }) {
	const [inputValue, setInputValue] = useState("");
	const [searchString, setSearchString] = useState("");

	const { data, sendToApi } = useFetch({
		endpoint: `${endpoint}?search=${searchString}`,
		method: "GET",
		auth: true,
		wait: true,
	});

	// Handles

	const handleUnderline = (e) => {
		setInputValue(e.target.value);
	};

	const handleSearch = (e) => {
		if (e.target.value !== "") {
			setSearchString(e.target.value);
			sendToApi();
		}
	};

	// Effects

	useEffect(() => {
		if (data) {
			setSearchResult(data);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	return (
		<div className="searchbar">
			<label className="searchbar__icon" htmlFor="search">
				{<AiOutlineSearch />}
			</label>
			<div className="searchbar-controls">
				<input
					type="text"
					name="search"
					className="searchbar-controls__input"
					onChange={(e) => {
						handleSearch(e);
						handleUnderline(e);
					}}
					placeholder="Rechercher ..."
				/>
				<span className="searchbar-controls__underline">
					{inputValue.replace(/ /g, "\u00a0")}
				</span>
			</div>
		</div>
	);
}

export default SearchBar;
