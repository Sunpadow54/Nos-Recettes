import Recipe from "./Recipe";

const Recipes = ({ recipes }) => {
	return (
		<section className="recipes">
            <h2>Toutes les Recettes :</h2>
            <ul className="recipes__cards">
                {recipes.map((recipe) => (
                    <Recipe key={recipe.id} recipe={recipe} />
                ))}
            </ul>
		</section>
	);
};

export default Recipes;
