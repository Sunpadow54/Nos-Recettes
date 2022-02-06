import { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
/* Import Style */
import "./recipesAll.scss";
/* Import Components */
import RecipesList from "../../../components/RecipesList/RecipesList";

function RecipesAll() {
	const { category } = useParams();
	const [query, setQuery] = useState(null);
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
		let params = category ? { category: category.slice(0, -1) } : null;
		setQuery(params);
	}, [category, setTitle]);

	return (
		<div className="recipes-list">
			<RecipesList query={query} />
		</div>
	);
}

export default RecipesAll;
