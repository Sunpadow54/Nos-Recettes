import useFetch from "../../../apiFetch/useFetch";
/* Import Style */
import "./profile.scss";
/* Import Icons */
import { IoRestaurantOutline } from "react-icons/io5";
// Import components
import ProfileCard from "../../../components/ProfileCard/ProfileCard";
import HeaderCard from "../../../components/RecipeCards/HeaderCard";
import IngredientsList from "../../../components/RecipeCards/IngredientsList";


function Profile() {
	// ---- Variables
	// id user for the fetchs
	const userId = 1; // test
	
	// ---- Fetchs
	const getUser = useFetch({
		endpoint: "/user/" + userId,
		method: "GET",
	});
	const getUserRecipes = useFetch({
		endpoint: "/recipe?id_user=" + userId,
		method: "GET",
	});

	const user = getUser.data;
	const userRecipes = getUserRecipes.data

	return (
		<div className="profile">
			{user && ( 
			<>	
				<ProfileCard className="profile-card" user={user}/>
				<div className="profile-name">
					<h3>{`${user.firstname} ${user.lastname}`}</h3>
				</div>
				<div>{user.email}</div>
			</>
			)}
			<section className="profile-recipes">
				<h4 className="profile-recipes__title">
					<IoRestaurantOutline />
					Toutes les recettes du chef :
				</h4>
				<ul className="profile-recipes__list">
					{userRecipes && 
					userRecipes.map((recipe) => (	
					<li key={recipe.id} className="profile-recipes__list--item">
						<HeaderCard recipe={recipe} />
						<IngredientsList ingredients={recipe.ingredients} />
					</li>
					))
					}
				</ul>
			</section>
		</div>
	);
}

export default Profile;