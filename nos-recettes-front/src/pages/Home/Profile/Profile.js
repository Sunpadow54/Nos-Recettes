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
	const id = 1; // test

	const getUser = useFetch({
		endpoint: "/user/" + id,
		method: "GET",
	});

	const getRecipes = useFetch({
		endpoint: "/recipe?id_user=" + id,
		method: "GET",
	});

	const user = getUser.data;
	const recipes = getRecipes.data;

	return (
		<div className="profile">
			{user && ( 
			<>	
				<ProfileCard className="profile-card" user={user}/>
				<div className="profile-name">
					<h3>{`${user.lastname} ${user.firstname}`}</h3>
				</div>
			</>
			)}
			<section className="profile-recipes">
				<h4 className="profile-recipes__title"><IoRestaurantOutline />Toutes les recettes du chef :</h4>
				<ul className="profile-recipes__list">
					{recipes && 
					recipes.map((recipe) => (	
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
