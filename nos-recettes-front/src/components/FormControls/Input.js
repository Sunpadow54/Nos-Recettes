/* Import Style */
import "./formControls.scss";

function Inputs(props) {
	const { label, onChange, options, light, noRequired, resizable, ...inputProps } = props;


	return (
		<div className={`input-group ${resizable ? "input-group--resize" : ""}`}>
			<input
				className="input-group__control"
                required={!noRequired && true}
				{...inputProps}
				onChange={onChange}
			/>
			<label
				className={`input-group__label 
                    ${light ? "input-group__label--light" : ""}
                `}
			>
				{label}
			</label>
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
