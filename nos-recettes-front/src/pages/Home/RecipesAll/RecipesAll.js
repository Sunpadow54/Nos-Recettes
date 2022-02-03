import { useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";
/* Import Style */
import "./recipesAll.scss";
/* Import Components */
import RecipesList from "../../../components/RecipesList/RecipesList";
import useFetch from "../../../apiFetch/useFetch";

function RecipesAll() {
	const { category } = useParams();
	const endpoint = category ? "?category=" + category.slice(0, -1) : "";
	const { setTitle } = useOutletContext();

	const getTitle = (param) => {
		switch (param) {
			case "entrees":
				return "Toutes les entrées";
			case "plats":
				return "Tous les plats";
			case "desserts":
				return "Tous les desserts";
			case "autres":
				return "Les autres recettes";
			default:
				return "Toutes les recettes";
		}
	};

	useEffect(() => {
		setTitle(getTitle(category));
	}, [category, setTitle]);

	const { data, error } = useFetch({
		endpoint: "/recipe" + endpoint,
		method: "GET",
	});

	return (
		<div className="recipes-list">
			{data && <RecipesList recipes={data} />}
			{error ? <p>{error}</p> : null}
		</div>
	);
}

export default RecipesAll;
