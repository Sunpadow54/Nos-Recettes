/* Import Style */
import "./cards.scss";

function StepsList({ steps }) {
	return (
		<div className="card__body">
			<h4 className="card__heading">Préparation</h4>
			<ul className="card-list">
				{steps.map((step, i) => (
					<li key={i} className="card-list__item">
						<h5 className="card__subtitle">{`étape ${i + 1}:`}</h5>
						<p className="card__text">{step}</p>
					</li>
				))}
			</ul>
		</div>
	);
}

export default StepsList;
