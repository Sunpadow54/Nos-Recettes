import { useEffect, useState, useContext } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import classNames from "classnames";
/* Import Icons */
import { IoRestaurantOutline } from "react-icons/io5";
import { RiEdit2Line, RiArrowGoBackLine } from "react-icons/ri";
/* Import Style */
import "./profile.scss";
// Import components
import { UserContext } from "../../../store/Store";
import useFetch from "../../../apiFetch/useFetch";
import UserCard from "../../../components/UserCard/UserCard";
import UserInfo from "../../../components/User/UserInfo";
import UserForm from "../../../components/User/UserForm";
import RecipesList from "../../../components/RecipesList/RecipesList";
import BtnBrand from "../../../components/Buttons/BtnBrand";

function Profile() {
	const { id } = useParams();
	const [currentUser] = useContext(UserContext);
	const [user, setUser] = useState(null);
	const isMyProfile = parseInt(id) === currentUser.id && true;
	const [isEdit, setEdit] = useState(false);
	const [nameWidth, setNameWidth] = useState({});
	const { setTitle } = useOutletContext();

	// ---- Fetchs

	const { data: userFetched } = useFetch({
		endpoint: "/user/" + id,
		method: "GET",
	});

	// ---- Button Edit || Profile

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

	// ---- Effects

	useEffect(() => {
		if (isMyProfile) {
			let pageTitle = isEdit ? "Modifier votre Profil" : "Votre Profil";
			setTitle(pageTitle);
		} else {
			setTitle("Le Profil du Chef");
		}
	}, [setTitle, isMyProfile, isEdit]);

	useEffect(() => {
		setUser(userFetched);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userFetched]);

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
					<section className="profile__recipes">
						<RecipesList
							query={{ id_user: id }}
							titleIcon={<IoRestaurantOutline />}
							title={"Toutes les recettes du chef"}
							small
							border
						/>
					</section>
				</>
			)}
		</div>
	);
}

export default Profile;
