import { useState } from "react";
/* Import Style */
import "./searchBar.scss";
/* Import Icons */
import { AiOutlineSearch } from "react-icons/ai";

function SearchBar({ onChange }) {
	const [inputValue, setInputValue] = useState("");

	const handleUnderline = (e) => {
		setInputValue(e.target.value);
	};

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
						onChange(e);
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
