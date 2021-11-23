import Recipe from "./Recipe";

const Recipes = ({ recipes }) => {
	return (
		<section>
            <h2>Toutes les Recettes :</h2>
			{recipes.map((recipe) => (
				<Recipe key={recipe.id} recipe={recipe} />
			))}
		</section>
	);
};

export default Recipes;
