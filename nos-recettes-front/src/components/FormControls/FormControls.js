import classNames from "classnames";
/* Style */
import "./formControls.scss";

function FormControls(props) {
	const {
		resizable,
		label,
		onChange,
		onKeyUp,
		value,
		formType,
		options,
		noRequired,
		labelTop,
		noLabel,
		color,
		btn,
		...inputProps
	} = props;

	// Classes
	const divClass = classNames(
		"input-group",
		resizable && inputProps.type !== "password" && "input-group--resizable"
	);
	const inputClass = classNames("input-group__control", color && color);
	const labelClass = classNames(
		"input-group__label",
		labelTop && "input-group__label--top",
		noLabel && "input-group__label--hide",
		color && color
	);

	//
	const optionsMap =
		options &&
		options.map((option, id) => (
			<option key={id} value={option}>
				{option}
			</option>
		));

	const isSelect = formType === "select" ? true : false;

	const CustomTagControl = formType ? formType : "input";

	const handleStyle = (e) => {
		if (resizable) {
			e.target.parentNode.dataset.value = e.target.value;
		}
		// change color of input if modified
		e.target.classList.add("blue-txt");
	};

	return (
		<div className={divClass} data-value={value}>
			<CustomTagControl
				className={inputClass}
				{...inputProps}
				value={value}
				required={!noRequired && true}
				onChange={(e) => {
					e.preventDefault();
					onChange(e);
					handleStyle(e);
				}}
				onKeyUp={onKeyUp}
				size={resizable && inputProps.type !== "password" ? 1 : "auto"}
			>
				{isSelect ? optionsMap : null}
			</CustomTagControl>

			<label className={labelClass} htmlFor={inputProps.name}>
				{label}
			</label>

			{inputProps.list && (
				<datalist id={inputProps.list}>{optionsMap}</datalist>
			)}
			{btn && <span className="input-group__btn">{btn}</span>}
		</div>
	);
}

export default FormControls;
