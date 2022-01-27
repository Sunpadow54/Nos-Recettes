import useFetch from "../../../apiFetch/useFetch";
import { useNavigate } from "react-router-dom";
/* Import Style */
import "./profile.scss";
/* Import Icons */
import { IoRestaurantOutline } from "react-icons/io5";
import { RiEdit2Line } from "react-icons/ri";
// Import components
import ProfileCard from "../../../components/ProfileCard/ProfileCard";
import HeaderCard from "../../../components/RecipeCards/HeaderCard";
import IngredientsList from "../../../components/RecipeCards/IngredientsList";
import BtnBrand from "../../../components/Buttons/BtnBrand";


function Profile() {
	// ---- Variables
	// id user for the fetchs
	const userId = 2; // test
	const navigate = useNavigate();

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
	const userRecipes = getUserRecipes.data;

	return (
		<div className="profile">
			<div className="profile-edit-btn">
				<BtnBrand
					onClick={() => {
						navigate("edit");
					}}
					icon={<RiEdit2Line />}
					label="modifier son profil"
					round={true}
					border0={true}
					color="red"
				/>
			</div>
			{user && (
				<>
					<ProfileCard className="profile-card" user={user} />
					<div className="profile-name">
						<h3><span>{`${user.firstname}`}</span><span>{`${user.lastname}`}</span></h3>
					</div>
                    <div className="profile-info">
                        <p className="profile-info__email">{user.email}</p>
                    </div>
				</>
			)}
			<section className="profile-recipes">
				<h2 className="profile-recipes__title">
					<IoRestaurantOutline />
					Toutes les recettes du chef :
				</h2>
				<ul className="profile-recipes__list">
					{userRecipes &&
						userRecipes.map((recipe) => (
							<li
								key={recipe.id}
								className="profile-recipes__list--item"
							>
								<HeaderCard recipe={recipe} />
								<IngredientsList
									ingredients={recipe.ingredients}
								/>
							</li>
						))}
				</ul>
			</section>
		</div>
	);
}

export default Profile;
