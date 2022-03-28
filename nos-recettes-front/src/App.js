import { Route, Routes } from "react-router-dom";
/* Import Components */
import Store from "./store/Store";
import PrivateRoute from "./routes/PrivateRoute";
import Home from "./pages/Home/Home";
import RecipesAll from "./pages/Home/RecipesAll/RecipesAll";
import Recipe from "./pages/Home/Recipe/Recipe";
import CreateRecipe from "./pages/Home/CreateRecipe/CreateRecipe";
import Profile from "./pages/Home/Profile/Profile";
import Admin from "./pages/Home/Admin/Admin";
import CreateUser from "./pages/Home/Admin/CreateUser";
import ManageIngredients from "./pages/Home/Admin/ManageIngredients";

function App() {
	return (
		<div className="App">
			<Store>
				<Routes>
					<Route element={<PrivateRoute />}>
						<Route path="/" element={<Home />}>
							<Route path="/" element={<RecipesAll />} />
							<Route path="/:category" element={<RecipesAll />} />
							<Route
								path="/:recipeName/:id"
								element={<Recipe />}
							/>
							<Route path="/create" element={<CreateRecipe />} />
							<Route path="/profil/:id" element={<Profile />} />
							<Route path="/admin" element={<Admin />}>
								{" "}
								{/*road to protect */}
								<Route path="create" element={<CreateUser />} />
								<Route
									path="ingredients"
									element={<ManageIngredients />}
								/>
							</Route>
						</Route>
					</Route>
				</Routes>
			</Store>
		</div>
	);
}

export default App;
