import { useRef, useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import classNames from "classnames";
/* Import Style */
import "./profile.scss";
/* Import Icons */
import { IoRestaurantOutline } from "react-icons/io5";
import { RiEdit2Line, RiArrowGoBackLine } from "react-icons/ri";
// Import components
import useFetch from "../../../apiFetch/useFetch";
import ProfileCard from "../../../components/ProfileCard/ProfileCard";
import RecipesList from "../../../components/RecipesList/RecipesList";
import BtnBrand from "../../../components/Buttons/BtnBrand";

function Profile() {
	// ---- Tools
	const userId = 2; // test
	const navigate = useNavigate();
	const location = useLocation();
	const [user, setUser] = useState();

	// ---- Fetchs User & recipes
	const { data: userFetched } = useFetch({
		endpoint: "/user/" + userId,
		method: "GET",
	});
	const { data: userRecipes } = useFetch({
		endpoint: "/recipe?id_user=" + userId,
		method: "GET",
	});

	useEffect(() => {
		setUser(userFetched);
	}, [userFetched]);

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

	const firstnameDiv = useRef(null);
	const lastnameDiv = useRef(null);
	const emailDiv = useRef(null);
	const [inputWidth, setInputWidth] = useState({
		lastname: { minWidth: "1rem" },
		firstname: { minWidth: "1rem" },
		email: { minWidth: "1rem" },
	});

	const getInputWidth = (div) => {
		const divPadding = window.getComputedStyle(div.current).paddingRight;
		const finalDivWidth =
			div.current.clientWidth - divPadding.replace("px", "") * 2;
		return Math.round(finalDivWidth) + "px";
	};

	useEffect(() => {
		setInputWidth({
			lastname: { minWidth: getInputWidth(lastnameDiv) },
			firstname: { minWidth: getInputWidth(firstnameDiv) },
			email: { minWidth: getInputWidth(emailDiv) },
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
						<p ref={emailDiv}>{user && user.email}</p>
					</div>
				</header>
				<Outlet context={[[user, setUser], inputWidth]} />
			</section>

			<section className="profile-recipes">
				<h2 className="profile-recipes__title">
					<IoRestaurantOutline />
					Toutes les recettes du chef :
				</h2>
				{userRecipes || userRecipes.length > 0 ? (
					<div className="profile-recipes__list">
						<RecipesList recipes={userRecipes} small border />
					</div>
				) : (
					<p>aucune recette</p>
				)}
			</section>
		</div>
	);
}

export default Profile;
