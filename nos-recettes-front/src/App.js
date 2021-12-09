import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
/* Import Components */
import Header from "./components/Header";
import Recipes from "./components/Recipes";
import Recipe from "./components/Recipe";
import Create from "./components/Create";
import Profile from "./components/Profile";

function App() {
    // State of the App
    /* recipes exemple for dev */
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

    // Shrink | Grow of <main>  (depend on Sidebar (header) showned or hide)
    const [isShrink, setShrink] = useState(false);
    const toogleShrink = (sideBarState) => {
        setShrink(sideBarState);
    };

    // Dom
    return (
        <Router>
            <div className="container-home">
                <Header toogleShrink={toogleShrink} />
                <main className={"main-home " + (isShrink ? "main-home--small" : false)}>
                    <Switch>
                        <Route exact path="/">
                            <Recipes recipes={recipes} />
                        </Route>
                        <Route path="/recette/:id">
                            <Recipe recipes={recipes} />
                        </Route>
                        <Route path="/create">
                            <Create />
                        </Route>
                        <Route path="/profile">
                            <Profile />
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    );
}

export default App;