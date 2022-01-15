/* Import Style */
import "./formControls.scss";

function Select(props) {
	const { label, onChange, options, ...inputProps } = props;
	return (
		<div className={`input-group`}>
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
			<label className="input-group__label input-group__label--light">
				{label}
			</label>
		</div>
	);
}

export default Select;
