import classNames from "classnames";
/* Import Style */
import "./recipesList.scss";
/* Import Components */
import HeaderCard from "../RecipeCards/HeaderCard";
import IngredientsList from "../RecipeCards/IngredientsList";

function RecipesList({ recipes, title, titleIcon, small, border }) {
	const cardClass = classNames(
		"recipe-card",
		small && "recipe-card--small",
		border && "recipe-card--border"
	);

	return (
		<>
			{title && (
				<h3 className="recipes-title">
					{titleIcon && titleIcon}
					{title}
				</h3>
			)}
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
