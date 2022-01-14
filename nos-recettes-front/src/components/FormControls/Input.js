/* Import Style */
import "./formControls.scss";

function Inputs(props) {
	const { label, onChange, options, ...inputProps } = props;

	return (
		<div className={`input-group input-group--${inputProps.type}`}>
			<input
				className="input-group__control"
				required
				{...inputProps}
				onChange={onChange}
			/>
			<label className="input-group__label">{label}</label>
			{options ? (
				<datalist id={inputProps.list}>
					{options.map((option, i) => (
						<option key={i} value={option}>
							{option}
						</option>
					))}
				</datalist>
			) : null}
		</div>
	);
}

export default Inputs;
