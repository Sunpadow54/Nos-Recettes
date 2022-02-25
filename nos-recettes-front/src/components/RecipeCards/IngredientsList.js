/* Import Style */
import "./recipeCards.scss";

function IngredientsList({ ingredients, children }) {
	const concat = (el) => {
		let article = el.name[0].match(/[aeiouh]/) ? "d'" : "de ";
		article = el.unit ? article : "";
		return el.quantity + " " + el.unit + " " + article + el.name;
	};

	const ingredientsList = children ? children : ingredients;

	return (
		<>
			<h4 className="card__heading">Ingrédients</h4>
			<ul className="card-list card-list--styled">
				{ingredientsList.map((ingredient, i) => (
					<li key={i} className="card-list__item">
						{children ? children[i] : <p>{concat(ingredient)}</p>}
					</li>
				))}
			</ul>
		</>
	);
}

export default IngredientsList;
