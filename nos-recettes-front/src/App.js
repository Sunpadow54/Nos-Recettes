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
import CreateUser from "./pages/Home/Admin/Actions/CreateUser";
import CreateIngredient from "./pages/Home/Admin/Actions/CreateIngredient";
import EditIngredient from "./pages/Home/Admin/Actions/EditIngredient";

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
								<Route
									path="user/create"
									element={<CreateUser />}
								/>
								<Route
									path="ingredient/create"
									element={<CreateIngredient />}
								/>
								<Route
									path="ingredient/edit"
									element={<EditIngredient />}
								/>
								<Route
									path="ingredient/delete"
									element={<p>delete ingr</p>}
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
