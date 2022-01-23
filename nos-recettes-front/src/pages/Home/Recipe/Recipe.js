import { useParams } from "react-router-dom";
/* Import Style */
import "./recipe.scss";
/* Import Components */
import HeaderCard from "../../../components/RecipeCards/HeaderCard";
import InfosCard from "../../../components/RecipeCards/InfosCard";
import IngredientsList from "../../../components/RecipeCards/IngredientsList";
import StepsList from "../../../components/RecipeCards/StepsList";
import useFetch from "../../../apiFetch/useFetch";

function Recipe() {
	const { id } = useParams();
	const { data, loading, error } = useFetch({
		endpoint: "/recipe/" + id,
		method: "GET",
	});
	console.log(data);

	return (
		<div class="recipe-alone">
			{data && !loading && (
				<>
					<HeaderCard recipe={data} alone={true} />
					<InfosCard recipe={data} />
					<IngredientsList
						ingredients={data.ingredients}
						alone={true}
					/>
					<StepsList steps={data.preparation} />
				</>
			)}
			{error ? <p>{error}</p> : null}
		</div>
	);
}

export default Recipe;
