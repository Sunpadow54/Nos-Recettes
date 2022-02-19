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
		...inputProps
	} = props;

	// Classes
	const divClass = classNames(
		"input-group",
		resizable && "input-group--resizable"
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
			onChange(e);
		}
		// change color of input if modified
		e.target.classList.add("blue-txt");
	};

	return (
		<div className={divClass} data-value={inputProps.defaultValue}>
			<CustomTagControl
				{...inputProps}
				//value={value}
				required={!noRequired && true}
				//onChange={onChange}
				onChange={handleChange}
				className="input-group__control"
				ref={ref}
				size={resizable && 1}
			>
				{isSelect ? optionsMap : null}
			</CustomTagControl>

			<label
				className={classNames(
					"input-group__label",
					labelTop && "input-group__label--top"
				)}
				htmlFor={inputProps.name}
			>
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
