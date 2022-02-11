import classNames from "classnames";
/* Import Style */
import "./formControls.scss";

function FormControls(props) {
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
        resizable && "input-group--resize"
    );

    //
    const optionsMap =
        options &&
        options.map((option, id) => (
            <option key={id} value={option}>
                {option}
            </option>
        ));

    const CustomTagControl = formType ? formType : "input";

    return (
        <div className={divClass}>
            <CustomTagControl
                {...inputProps}
                value={value}
                required={!noRequired && true}
                onChange={onChange}
                className="input-group__control"
            >
                {formType && formType === "select" && optionsMap}
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
}

export default FormControls;
