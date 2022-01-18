/* Import Style */
import "./recipes.scss";
/* Import Components */
import HeaderCard from "../../../components/Cards/HeaderCard";
import IngredientsList from "../../../components/Cards/IngredientsList";
import useFetch from "../../../apiFetch/useFetch";

function Recipes() {
	const { data, error } = useFetch({ endpoint: "/recipe", method: "GET" });
	console.log(data);

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
