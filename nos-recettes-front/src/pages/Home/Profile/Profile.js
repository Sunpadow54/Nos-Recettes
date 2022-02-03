import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames";
/* Import Icons */
import { IoRestaurantOutline } from "react-icons/io5";
import { RiEdit2Line, RiArrowGoBackLine } from "react-icons/ri";
/* Import Style */
import "./profile.scss";
// Import components
import useFetch from "../../../apiFetch/useFetch";
import UserCard from "../../../components/UserCard/UserCard";
import UserInfo from "../../../components/User/UserInfo";
import UserForm from "../../../components/User/UserForm";
import RecipesList from "../../../components/RecipesList/RecipesList";
import BtnBrand from "../../../components/Buttons/BtnBrand";

function Profile() {
	const { id } = useParams();
	const isMyProfile = id === "2" && true; // need to compare with token
	const [isEdit, setEdit] = useState(false);
	const [nameWidth, setNameWidth] = useState({});
	const [user, setUser] = useState(null);

	// ---- Fetchs user & recipes
	const { data: userFetched } = useFetch({
		endpoint: "/user/" + id,
		method: "GET",
	});
	const { data: userRecipes } = useFetch({
		endpoint: "/recipe?id_user=" + id,
		method: "GET",
	});
	useEffect(() => {
		setUser(userFetched);
	}, [userFetched]);

	// ---- Button

	const editButton = isEdit
		? {
				icon: <RiArrowGoBackLine />,
				label: "retour au profil",
				color: "blue",
		  }
		: {
				icon: <RiEdit2Line />,
				label: "modifier son profil",
				color: "red",
		  };

	// ---- Handles

	const handleToogleEdit = (e) => {
		setEdit(!isEdit);
	};

	return (
		<div className="profile">
			{user && (
				<>
					{isMyProfile && (
						<div className="profile__edit-btn">
							<BtnBrand
								{...editButton}
								onClick={handleToogleEdit}
								border0
								round
							/>
						</div>
					)}
					<UserCard className="profile__card" user={user} />
					<UserInfo
						className={classNames(
							"profile__info",
							isEdit && "profile__info--hide"
						)}
						user={user}
						setNameWidth={setNameWidth}
						hideEmail={!isMyProfile}
					/>
					{isEdit && (
						<UserForm
							user={user}
							setUser={setUser}
							userId={id}
							nameWidth={nameWidth}
							setEdit={setEdit}
						/>
					)}
				</>
			)}

			{userRecipes && userRecipes.length > 0 && (
				<section className="profile__recipes">
					<RecipesList
						recipes={userRecipes}
						titleIcon={<IoRestaurantOutline />}
						title={"Toutes les recettes du chef"}
						small
						border
					/>
				</section>
			)}
		</div>
	);
}

export default Profile;
