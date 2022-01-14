/* Import Style */
import "./formControls.scss";

function Select(props) {
    const { label, onChange, options, ...inputProps } = props;
    return (
        <div className={`input-group input-group--select`}>
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
        </div>
    )
}

export default Select
