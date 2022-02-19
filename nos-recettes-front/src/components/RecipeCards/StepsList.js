/* Import Style */
import "./recipeCards.scss";

function StepsList({ steps, children }) {
	const stepsList = children ? children : steps;

	return (
		<div className="card__body">
			<h4 className="card__heading">Préparation</h4>
			<ul className="card-list">
				{stepsList.map((step, i) => (
					<li key={i} className="card-list__item">
						<h5 className="card__subtitle">{`étape ${i + 1}:`}</h5>
						{children ? (
							children[i]
						) : (
							<p className="card__text">{step}</p>
						)}
					</li>
				))}
			</ul>
		</div>
	);
}

export default StepsList;
