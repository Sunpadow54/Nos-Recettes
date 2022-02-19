/* Import Style */
import "./recipeCards.scss";

function IngredientsList({ ingredients, alone, children }) {
	const concat = (el) => {
		let article = el.name[0].match(/[aeiouh]/) ? "d'" : "de ";
		article = el.unit ? article : "";
		return el.quantity + " " + el.unit + " " + article + el.name;
	};

	const ingredientsList = children ? children : ingredients;

	return (
		<>
			{!alone ? (
				<ul className="card-pills">
					{ingredients.map((ingredient) => (
						<li key={ingredient} className="card-pills__item">
							{ingredient}
						</li>
					))}
				</ul>
			) : (
				<div className="card__body">
					<h4 className="card__heading">Ingrédients</h4>
					<ul className="card-list card-list--styled">
						{ingredientsList.map((ingredient, i) => (
							<li
								key={ingredient.name}
								className="card-list__item"
							>
								{children ? children[i] : concat(ingredient)}
							</li>
						))}
					</ul>
				</div>
			)}
		</>
	);
}

export default IngredientsList;
