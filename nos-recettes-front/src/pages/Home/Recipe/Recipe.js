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
	const {
		data: recipe,
		loading,
		error,
	} = useFetch({
		endpoint: "/recipe/" + id,
		method: "GET",
        auth: true,
	});

	return (
		<div className="recipe-alone">
			{recipe && !loading && (
				<>
					<HeaderCard recipe={recipe} alone />
					<InfosCard recipe={recipe} />
					<IngredientsList ingredients={recipe.ingredients} alone />
					<StepsList steps={recipe.preparation} />
				</>
			)}
			{error && <p>{error}</p>}
		</div>
	);
}

export default Recipe;
