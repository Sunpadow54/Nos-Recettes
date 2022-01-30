import classNames from "classnames";
/* Import Style */
import "./formControls.scss";

function Inputs(props) {
	const {
		label,
		onChange,
		options,
		light,
		noRequired,
		resizable,
		...inputProps
	} = props;

	const divClass = classNames(
		"input-group",
		resizable && "input-group--resize"
	);

	const labelClass = classNames(
		"input-group__label",
		light && "input-group__label--light"
	);

	return (
		<div className={divClass}>
			<input
				{...inputProps}
				className="input-group__control"
				required={!noRequired && true}
				onChange={onChange}
			/>
			<label className={labelClass}>{label}</label>
			{options && (
				<datalist id={inputProps.list}>
					{options.map((option, i) => (
						<option key={i} value={option}>
							{option}
						</option>
					))}
				</datalist>
			)}
		</div>
	);
}

export default Inputs;
