import { forwardRef } from "react";
import classNames from "classnames";
/* Import Style */
import "./formControls.scss";

const FormControls = forwardRef((props, ref) => {
	const {
		resizable,
		label,
		onChange,
		value,
		formType,
		options,
		noRequired,
		labelTop,
		color,
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

	const handleChange = (e) => {
		if (resizable) {
			e.target.parentNode.dataset.value = ref.current.value;
		}
		if (onChange) {
			onChange(e); // ! remove later when use refs for all inputs ?
		}
		// change color of input if modified
		e.target.classList.add("blue-txt");
	};

	return (
		<div className={divClass} data-value={inputProps.defaultValue}>
			<CustomTagControl
				{...inputProps}
				required={!noRequired && true}
				onChange={handleChange}
				className={inputClass}
				ref={ref}
				size={resizable && inputProps.type !== "password" ? 1 : "auto"}
			>
				{isSelect ? optionsMap : null}
			</CustomTagControl>

			<label className={labelClass} htmlFor={inputProps.name}>
				{label}
			</label>

			{inputProps.list && (
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
});

export default FormControls;
