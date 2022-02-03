import { Route, Routes } from "react-router-dom";
/* Import Components */
import Home from "./pages/Home/Home";
import RecipesAll from "./pages/Home/RecipesAll/RecipesAll";
import Recipe from "./pages/Home/Recipe/Recipe";
import CreateRecipe from "./pages/Home/CreateRecipe/CreateRecipe";
import Profile from "./pages/Home/Profile/Profile";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />}>
					<Route path="/" element={<RecipesAll />} />
					<Route path="/:category" element={<RecipesAll />} />
					<Route path="/:recipeName/:id" element={<Recipe />} />
					<Route path="/create" element={<CreateRecipe />} />
					<Route path="/profil/:id" element={<Profile />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
