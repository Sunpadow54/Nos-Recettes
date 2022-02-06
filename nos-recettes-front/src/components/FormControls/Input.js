import classNames from "classnames";
/* Import Style */
import "./formControls.scss";

function Inputs(props) {
	const {
		label,
		onChange,
		options,
		light,
		color,
		noRequired,
		resizable,
		...inputProps
	} = props;

	// Classes
	const divClass = classNames(
		"input-group",
		resizable && "input-group--resize"
	);
	const inputClass = classNames(
		"input-group__control",
		color && `${color}-txt`
	);

	const labelClass = classNames(
		"input-group__label",
		light && "input-group__label--light",
		color && `${color}-txt`
	);

	return (
		<div className={divClass}>
			<input
				{...inputProps}
				className={inputClass}
				required={!noRequired && true}
				onChange={onChange}
			/>
			<label htmlFor={inputProps.name} className={labelClass}>
				{label}
			</label>
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
