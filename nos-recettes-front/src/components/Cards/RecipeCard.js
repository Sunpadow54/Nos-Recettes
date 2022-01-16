/* Import Style */
import "./recipeCard.scss";
// Import img placeholder
import placeholderImg from "../../style/images/lukas-blazek-f-TWhXOrLiU-unsplash.jpg";

function RecipeCard({ recipe }) {
	return (
		<div>
			<img
				src={recipe.img ? recipe.img : placeholderImg}
				alt={recipe.title}
				className="recipe__img"
				width="400px"
				height="300px"
			/>
			<h3 className="recipe__title">{recipe.title}</h3>
			<ul className="recipe__ingredients">
				{recipe.ingredients.map((ingredient) => (
					<li key={ingredient} className="recipe__ingredients-item">
						{ingredient}
					</li>
				))}
			</ul>
		</div>
	);
}

export default RecipeCard;
