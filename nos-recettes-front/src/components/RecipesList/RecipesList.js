import classNames from "classnames";
/* Import Style */
import "./recipesList.scss";
/* Import Components */
import useFetch from "../../hooks/useFetch";
import HeaderCard from "../RecipeCards/HeaderCard";
import IngredientsPills from "../RecipeCards/IngredientsPills";

function RecipesList({ query, title, titleIcon, small, border }) {
	const createEndpoint = () => {
		let string = "/recipe";
		if (query) {
			//let queriesString = "?"
			let arr = [];
			for (const property in query) {
				arr.push(`${property}=${query[property]}`);
			}
			string += "?" + arr.join("&");
		}
		return string;
	};

	const endpoint = createEndpoint();

	const { data: recipes } = useFetch({
		endpoint: endpoint,
		method: "GET",
		auth: true,
	});

	const cardClass = classNames(
		"recipe-card",
		small && "recipe-card--small",
		border && "recipe-card--border"
	);

	return (
		<>
			{title && (
				<h3 className="recipes-title">
					{titleIcon && titleIcon}
					{title}
				</h3>
			)}
			{recipes && recipes.length > 0 ? (
				recipes.map((recipe) => (
					<article key={recipe.id} className={cardClass}>
						<HeaderCard recipe={recipe} />
						<IngredientsPills ingredients={recipe.ingredients} />
					</article>
				))
			) : (
				<p>aucune recette trouvée</p>
			)}
		</>
	);
}

export default RecipesList;
