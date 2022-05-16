import classNames from "classnames";
/* Import Style */
import "./btnSimpleIcon.scss";

function BtnSimpleIcon({ icon, label, color, onClick }) {
	const btnClass = classNames(
		"btn-icon",
		color.text && `${color.text}-txt`,
		color.bg && `${color.bg}-bg`
	);
	return (
		<button className={btnClass} aria-label={label} onClick={onClick}>
			{icon}
		</button>
	);
}

export default BtnSimpleIcon;
