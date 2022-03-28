import classNames from "classnames";
/* Import Style */
import "./statBox.scss";
// Import Components

function StatBox({ icon, color, nbr, text }) {
	const classBox = classNames("stat-box", color && `stat-box--${color}`);

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
