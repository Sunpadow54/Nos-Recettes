import useFetch from "../../../apiFetch/useFetch";
import { useRef } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import classNames from "classnames";
/* Import Style */
import "./profile.scss";
/* Import Icons */
import { IoRestaurantOutline } from "react-icons/io5";
import { RiEdit2Line, RiArrowGoBackLine } from "react-icons/ri";
// Import components
import ProfileCard from "../../../components/ProfileCard/ProfileCard";
import HeaderCard from "../../../components/RecipeCards/HeaderCard";
import IngredientsList from "../../../components/RecipeCards/IngredientsList";
import BtnBrand from "../../../components/Buttons/BtnBrand";
import { useEffect, useState } from "react";

function Profile() {
	// ---- Tools
	const userId = 2; // test
	const navigate = useNavigate();
	const location = useLocation();

	// ---- Fetchs User & recipes
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

	// ---- Button edit or profile
	const isEdit = location.pathname.includes("edit");
	const button = isEdit
		? {
				onClick: () => navigate(""),
				icon: <RiArrowGoBackLine />,
				label: "retour au profil",
				color: "blue",
		  }
		: {
				onClick: () => navigate("edit"),
				icon: <RiEdit2Line />,
				label: "modifier son profil",
				color: "red",
		  };

	// ---- Width of inputs if edit mode
	const getInputWidth = (div) => {
		const divPadding = window.getComputedStyle(div.current).paddingRight;
		const finalDivWidth =
			div.current.clientWidth - divPadding.replace("px", "") * 2;
		return Math.round(finalDivWidth) + "px";
	};

	const firstnameDiv = useRef(null);
	const lastnameDiv = useRef(null);
	const [inputWidth, setInputWidth] = useState({
		lastname: { minWidth: "1rem" },
		firstname: { minWidth: "1rem" },
	});

	useEffect(() => {
		setInputWidth({
			lastname: { minWidth: getInputWidth(lastnameDiv) },
			firstname: { minWidth: getInputWidth(firstnameDiv) },
		});
	}, [user]);

	return (
		<div className="profile">
			<div className="profile-edit-btn">
				<BtnBrand {...button} round border0 />
			</div>

			{user && <ProfileCard className="profile-card" user={user} />}

			<section className="profile-info">
				<header
					className={classNames(
						"profile-info__group",
						isEdit && "profile-info__group--hide"
					)}
				>
					<h3 className={"profile-info__name"}>
						<span ref={firstnameDiv}>{user && user.firstname}</span>
						<span ref={lastnameDiv}>{user && user.lastname}</span>
					</h3>
					<div className="profile-info__more">
						<p>{user && user.email}</p>
					</div>
				</header>

				<Outlet context={{ user, inputWidth }} />
			</section>

			{userRecipes && userRecipes.length > 0 && (
				<section className="profile-recipes">
					<h2 className="profile-recipes__title">
						<IoRestaurantOutline />
						Toutes les recettes du chef :
					</h2>
					<ul className="profile-recipes__list">
						{userRecipes.map((recipe) => (
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
			)}
		</div>
	);
}

export default Profile;
