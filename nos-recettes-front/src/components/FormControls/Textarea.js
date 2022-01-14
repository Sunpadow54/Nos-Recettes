/* Import Style */
import "./formControls.scss";

function Textarea(props) {
    const { label, onChange, ...inputProps } = props;
    return (
        <div className={`input-group input-group--textarea`}>
			<textarea
                className="input-group__control"
                {...inputProps}
                required
                onChange={onChange}
            >
            </textarea>
			<label className="input-group__label">{label}</label>
		</div>
    )
}

export default Textarea
