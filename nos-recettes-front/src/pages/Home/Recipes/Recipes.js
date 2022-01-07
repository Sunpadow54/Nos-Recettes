import { useState } from "react";
/* Import Style */
import "./recipes.scss";
/* Import Components */
import RecipeCard from '../../../components/Cards/RecipeCard'

function Recipes() {
	const [recipes /* setRecipes */] = useState([
        {
            id: 1,
            title: "Epinards aux oeufs pochés",
            duration: "20 min",
            ingredients: ["basilic", "épinards", "oeufs", "beurre"],
            directions: [
                "Hacher les épinards et les faire fondre dans le beurre avec 1 cuillère à soupe de basilic",
                "Pocher les oeufs dans l'eau bouillante vinaigrée durant 5 minutes.",
                "Répartir les épinards dans les assiettes et déposer au centre 1 oeuf poché.",
                "Parsemer de basilic, saler, poivrer.",
            ],
        },
        {
            id: 2,
            title: "Lasagnes au saumon et aux épinards",
            duration: "40 min",
            ingredients: [
                "lasagnes",
                "épinards",
                "saumon",
                "beurre",
                "crème fraiche liquide",
            ],
            directions: [
                "Préchauffer le four (210°C). Faire décongeler les épinards suffisamment longtemps à l'avance.",
                "Mettre un peu de beurre dans un plat rectangulaire ou carré allant au four, puis une couche de lasagnes, une couche de saumon, une couche d'épinards et un peu de parmesan. Recommencer l'opération jusqu'à la fin des ingrédients.",
                "Verser la crème liquide préalablement salée et poivrée.",
                "Remettre un peu de parmesan puis cuire à four chaud pendant 25 mn.",
            ],
        },
        {
            id: 3,
            title: "Epinards 2 aux oeufs pochés",
            duration: "20 min",
            ingredients: ["basilic", "épinards", "oeufs", "beurre"],
            directions: [
                "Hacher les épinards et les faire fondre dans le beurre avec 1 cuillère à soupe de basilic",
                "Pocher les oeufs dans l'eau bouillante vinaigrée durant 5 minutes.",
                "Répartir les épinards dans les assiettes et déposer au centre 1 oeuf poché.",
                "Parsemer de basilic, saler, poivrer.",
            ],
        },
    ]);
	return (
			<div className="recipes">
				{recipes.map((recipe) => (
					<article key={recipe.id} className="recipe">
						<RecipeCard recipe={recipe}/>
					</article>
				))}
			</div>
	)
}

export default Recipes
