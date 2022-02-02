import classNames from "classnames";
/* Import Style */
import "./btnBrand.scss";

function BtnBrand(props) {
    const { label, text, onClick, icon, round, color, border0, ...btnProps } =
        props;

    const btnClass = classNames(
        "btn-brand",
        round ? "btn-brand--round" : "btn-brand--square",
        border0 && "btn-brand--border-0",
        color && "btn-brand--" + color
    );

    return (
        <button {...btnProps} className={btnClass} onClick={onClick}>
            {icon && icon}
            {label && <span className="btn-brand__popup">{label}</span>}
            {text && text}
        </button>
    );
}

export default BtnBrand;
