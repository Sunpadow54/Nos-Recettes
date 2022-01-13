/* Import Style */
import "./input.scss";

function Input(props) {
	const { label, onChange, options, ...inputProps } = props;
	const formControl = () => {
		if (options) {
			return "select";
		}
		if (inputProps.type === "textarea") {
			return "textarea";
		}
		if (inputProps.type === "time") {
			return "time";
		}
		return "input";
	};
	const formType = formControl();

	return (
		<div className={`input-group input-group--${formType}`}>
			<label className="input-group__label">{label}</label>
			{(() => {
				switch (formType) {
					case "input":
					case "time":
						return (
							<input
								className="input-group__control"
								required
								{...inputProps}
								onChange={onChange}
							/>
						);
					case "select":
						return (
							<select
								className="input-group__control"
								required
								{...inputProps}
								onChange={onChange}
							>
								{options.map((option, id) => (
									<option key={id} value={option}>
										{option}
									</option>
								))}
							</select>
						);
					case "textarea":
						return (
							<textarea
								className="input-group__control"
								required
								onChange={onChange}
							></textarea>
						);
					default:
						return null;
				}
			})()}
		</div>
	);
}

export default Input;
