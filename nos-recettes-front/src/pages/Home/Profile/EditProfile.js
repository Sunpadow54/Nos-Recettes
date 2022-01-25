import useFetch from "../../../apiFetch/useFetch";
import { useState } from "react";
/* Import Style */
import "./profile.scss";
/* Import Icons */
import { IoRestaurantOutline } from "react-icons/io5";
// Import components
import ProfileCard from "../../../components/ProfileCard/ProfileCard";
import Input from "../../../components/FormControls/Input";
import HeaderCard from "../../../components/RecipeCards/HeaderCard";
import IngredientsList from "../../../components/RecipeCards/IngredientsList";


function EditProfile() {
	// ---- Variables
	// id user for the fetchs
	const userId = 1; // test
	const [userForm, setUserForm] = useState({});

	// Fetchs user and his recipes
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

	// Function : inputs values showned are default or input change
	const getValues = (key) => {
		return userForm[key] ? userForm[key] : user[key]
	}
	const inputs = [
		{
			type: "text",
			name: "firstname",
			label:"Prénom",
		},
		{
			type: "text",
			name: "lastname",
			label: "Nom",
		},
		{
			type: "text",
			name: "username",
			label: "Username",
		},
	];

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setUserForm({
			...userForm,
			[name]: value
		});
	};

  return (
		<div className="profile">
			{user && (
				<>	
				<ProfileCard className="profile-card" user={user}/>
				<div className="profile-name">
					<Input
						{... inputs[0]}
						value={getValues('firstname')}
						onChange={handleInputChange}
					/>
					<Input
						{... inputs[1]}
						value={getValues('lastname')}
						onChange={handleInputChange}
					/>
				</div>
				<div>{user.email}</div>
			</>
			)}
			<section className="profile-recipes">
				<h4 className="profile-recipes__title"><IoRestaurantOutline />Toutes les recettes du chef :</h4>
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

export default EditProfile;
