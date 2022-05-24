import { useState } from "react";
/* Style */
import "./formControls.scss";
/* Component */
import useFetch from "../../hooks/useFetch";

function FormAutoComplete(props) {
	const { label, btn, endpoint, setSelected, ...inputProps } = props;
	const [searchString, setSearchString] = useState("");

	const { data: options, sendToApi } = useFetch({
		endpoint: `${endpoint}?search=${searchString}`,
		method: "GET",
		auth: true,
		wait: true,
	});

	// ----- Handles

	const handleSearch = (e) => {
		if (e.target.value !== "") {
			setSearchString(e.target.value);
			sendToApi();
		}
	};

	const handleGetValue = (e) => {
		if (e.target.value !== "" && options) {
			const selectItem = options.find((element) =>
				Object.values(element).includes(e.target.value)
			);
			setSelected(selectItem);
		}
	};

	return (
		<div className="input-group">
			<input
				className="input-group__control"
				list="list"
				type="search"
				onChange={(e) => {
					handleSearch(e);
					handleGetValue(e);
				}}
			/>
			<label className="input-group__label" htmlFor={inputProps.name}>
				{label}
			</label>
			{options && (
				<datalist id="list">
					{options.map((option, i) => (
						<option
							key={i}
							value={option.name ? option.name : option}
						>
							{option.name ? option.name : option}
						</option>
					))}
				</datalist>
			)}

			{btn && <span className="input-group__btn">{btn}</span>}
		</div>
	);
}

export default FormAutoComplete;
