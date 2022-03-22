import classNames from "classnames";
import { Link } from "react-router-dom";
/* Import Style */
import "./btnBrand.scss";

function BtnBrand(props) {
	const {
		src,
		label,
		text,
		onClick,
		icon,
		round,
		color,
		border0,
		...btnProps
	} = props;

	const btnClass = classNames(
		"btn-brand",
		round ? "btn-brand--round" : "btn-brand--square",
		border0 && "btn-brand--border-0",
		color && "btn-brand--" + color
	);

	const ConditionalLink = ({ children }) =>
		src ? (
			<Link to={src} {...btnProps} className={btnClass}>
				{children}
			</Link>
		) : (
			<button
				{...btnProps}
				className={btnClass}
				onClick={onClick && onClick}
			>
				{children}
			</button>
		);

	return (
		<ConditionalLink>
			{icon && icon}
			{label && <span className="btn-brand__popup">{label}</span>}
			{text && text}
		</ConditionalLink>
	);
}

export default BtnBrand;
