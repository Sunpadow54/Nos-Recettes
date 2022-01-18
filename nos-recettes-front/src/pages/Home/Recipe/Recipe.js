import { useParams } from "react-router-dom";
/* Import Components */
import HeaderCard from "../../../components/Cards/HeaderCard";
import IngredientsList from "../../../components/Cards/IngredientsList";
import StepsList from "../../../components/Cards/StepsList";
import useFetch from "../../../apiFetch/useFetch";

function Recipe() {
	const { id } = useParams();
	const { data, loading, error } = useFetch({
		endpoint: "/recipe/" + id,
		method: "GET",
	});
	console.log(data);

	return (
		<div>
			{data && !loading && (
				<>
					<HeaderCard recipe={data} alone={true} />
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
