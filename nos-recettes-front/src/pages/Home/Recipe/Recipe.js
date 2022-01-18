import { useParams } from "react-router-dom";
/* Import Components */
import RecipeCard from "../../../components/Cards/RecipeCard";
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
			{data && !loading ? (
				<RecipeCard recipe={data} alone={true} />
			) : null}
			{error ? <p>{error}</p> : null}
		</div>
	);
}

export default Recipe;
