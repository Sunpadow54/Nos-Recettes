import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
/* Import Components */
import Home from "./pages/Home/Home";
import Recipes from "./pages/Home/RecipesList/Recipes";
import Recipe from "./pages/Home/Recipe/Recipe";
import CreateRecipe from "./pages/Home/CreateRecipe/CreateRecipe";
import Profile from "./pages/Home/Profile/Profile";

function App() {
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route path="/" element={<Home />}>
						<Route path="/" element={<Recipes />} />
                        <Route path="/:category" element={<Recipes />} />
						<Route path="/:recipeName/:id" element={<Recipe />} />
						<Route path="create" element={<CreateRecipe />} />
						<Route path="profil" element={<Profile />} />
					</Route>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
