/* Import Style */
import "./recipes.scss";
/* Import Components */
import RecipeCard from "../../../components/Cards/RecipeCard";
import useFetch from "../../../apiFetch/useFetch";

function Recipes() {
	const { data, error } = useFetch({ endpoint: "/recipe", method: "GET" });
	console.log(data);
	return (
		<div className="recipe-list">
			{data
				? data.map((recipe) => (
						<article key={recipe.id} className="card">
							<RecipeCard recipe={recipe} />
						</article>
				  ))
				: null}
			{error ? <p>{error}</p> : null}
		</div>
	);
}

export default Recipes;
