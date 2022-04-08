import classNames from "classnames";
/* Import Style */
import "./statBox.scss";
// Import Components

function StatBox({ icon, colorTxt, colorBg, nbr, text }) {
	const classBox = classNames(
		"stat-box",
		colorBg && `${colorBg}-bg`,
		colorTxt && `${colorTxt}-txt`
	);

	return (
		<div className={classBox}>
			<span className="stat-box__icon">{icon}</span>
			<p className="stat-box__content">
				<strong>{nbr}</strong>
				{text}
			</p>
		</div>
	);
}

export default StatBox;
