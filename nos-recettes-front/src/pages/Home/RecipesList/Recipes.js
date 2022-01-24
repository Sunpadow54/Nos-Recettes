import { useParams } from "react-router-dom";
/* Import Style */
import "./recipes.scss";
/* Import Components */
import HeaderCard from "../../../components/RecipeCards/HeaderCard";
import IngredientsList from "../../../components/RecipeCards/IngredientsList";
import useFetch from "../../../apiFetch/useFetch";

function Recipes() {
	const { category } = useParams();
	const endpoint = category ? "?category=" + category.slice(0, -1) : "";

	const { data, error } = useFetch({
		endpoint: "/recipe" + endpoint,
		method: "GET",
	});

	return (
		<div className="recipes-list">
			{data
				? data.map((recipe) => (
						<article key={recipe.id} className="card">
							<HeaderCard recipe={recipe} />
							<IngredientsList ingredients={recipe.ingredients} />
						</article>
				  ))
				: null}
			{error ? <p>{error}</p> : null}
		</div>
	);
}

export default Recipes;
