import classNames from "classnames";
/* Import Style */
import "./recipesList.scss";
/* Import Components */
import HeaderCard from "../RecipeCards/HeaderCard";
import IngredientsList from "../RecipeCards/IngredientsList";

function RecipesList({ recipes, small, border }) {
	const cardClass = classNames(
		"card",
		small && "card--small",
		border && "card--border"
	);

	return (
		<>
			{recipes &&
				recipes.map((recipe) => (
					<article key={recipe.id} className={cardClass}>
						<HeaderCard recipe={recipe} />
						<IngredientsList ingredients={recipe.ingredients} />
					</article>
				))}
		</>
	);
}

export default RecipesList;
