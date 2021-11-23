import { useState } from "react";
/* Import Components */
import Header from "./components/Header";
import Recipes from "./components/Recipes";

function App() {
	// State of the App
    /* recipes exemple for dev */
	const [recipes, /* setRecipes */] = useState([
		{
			id: 1,
			title: "Epinards aux oeufs pochés",
			duration: "20 min",
			ingredients: ["basilic", "épinards", "oeufs", "beurre"],
			directions: [
				{
					id: 1,
					stepTxt:
						"Hacher les épinards et les faire fondre dans le beurre avec 1 cuillère à soupe de basilic",
				},
				{
					id: 2,
					stepTxt:
						"Pocher les oeufs dans l'eau bouillante vinaigrée durant 5 minutes.",
				},
				{
					id: 3,
					stepTxt:
						"Répartir les épinards dans les assiettes et déposer au centre 1 oeuf poché.",
				},
				{
					id: 4,
					stepTxt: "Parsemer de basilic, saler, poivrer.",
				},
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
				{
					id: 1,
					stepTxt:
						"Préchauffer le four (210°C). Faire décongeler les épinards suffisamment longtemps à l'avance. Préchauffer le four (210°C).",
				},
				{
					id: 2,
					stepTxt:
						"Mettre un peu de beurre dans un plat rectangulaire ou carré allant au four, puis une couche de lasagnes, une couche de saumon, une couche d'épinards et un peu de parmesan. Recommencer l'opération jusqu'à la fin des ingrédients.",
				},
				{
					id: 3,
					stepTxt:
						"Verser la crème liquide préalablement salée et poivrée.",
				},
				{
					id: 4,
					stepTxt:
						"Remettre un peu de parmesan puis cuire à four chaud pendant 25 mn.",
				},
			],
		},
	]);

/*     const breadcrumbLinks = [
        'toutes les recettes',
        'entrée',
        'plat',
        'dessert'
    ]; */

	// Dom
	return (
		<div className="container-home">
			<Header />
            <main>
                <Recipes recipes={recipes} />
            </main>
		</div>
	);
}

export default App;
