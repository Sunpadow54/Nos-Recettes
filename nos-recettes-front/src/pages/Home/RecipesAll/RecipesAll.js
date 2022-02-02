import { useParams } from "react-router-dom";
/* Import Style */
import "./recipesAll.scss";
/* Import Components */
import RecipesList from "../../../components/RecipesList/RecipesList";
import useFetch from "../../../apiFetch/useFetch";

function RecipesAll() {
	const { category } = useParams();
	const endpoint = category ? "?category=" + category.slice(0, -1) : "";

	const { data, error } = useFetch({
		endpoint: "/recipe" + endpoint,
		method: "GET",
	});

	return (
		<div className="recipes-list">
			{data &&
                <RecipesList recipes={data}/>
            }
			{error ? <p>{error}</p> : null}
		</div>
	);
}

export default RecipesAll;
