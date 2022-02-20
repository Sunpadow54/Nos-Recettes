import { useEffect, useState, useContext, ref } from "react";
import { useParams, useOutletContext } from "react-router-dom";
/* Import Icons */
import { IoRestaurantOutline } from "react-icons/io5";
/* Import Style */
import "./profile.scss";
// Import components
import { UserContext } from "../../../store/Store";
import useFetch from "../../../hooks/useFetch";
import useToggleEdit from "../../../hooks/useToggleEdit";
import useUserForm from "../../../hooks/useUserForm";
import UserCard from "../../../components/UserCard/UserCard";
import FormControls from "../../../components/FormControls/FormControls";
import RecipesList from "../../../components/RecipesList/RecipesList";
import PopupValidate from "../../../components/Popup/PopupValidate";

function Profile() {
	const { id } = useParams();
	const [currentUser] = useContext(UserContext);
	const [user, setUser] = useState(null);
	const isMyProfile = parseInt(id) === currentUser.id && true;
	const { btnEdit, isEdit, setEdit } = useToggleEdit();
	const { inputs, handleSubmit, userChanged, error } = useUserForm({
		user,
		id,
	});
	const { setTitle } = useOutletContext();

	const inputsName = [inputs.firstname, inputs.lastname];
	const inputsMore = [inputs.email, inputs.username, inputs.newPassword];

	// ---- Fetchs

	const { data: userFetched } = useFetch({
		endpoint: "/user/" + id,
		method: "GET",
		auth: true,
	});

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

	useEffect(() => {
		if (userChanged) {
			setEdit(false);
			setUser({
				...user,
				...userChanged,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userChanged]);

	return (
		<div className="profile">
			{user && (
				<>
					{isMyProfile && (
						<div className="profile__edit-btn">{btnEdit}</div>
					)}
					<UserCard className="profile__card" user={user} />
					<div className="profile__info">
						{isEdit ? (
							<>
								<div className="user-info__name">
									{inputsName.map((input, i) => (
										<FormControls
											key={i}
											{...input}
											resizable
										/>
									))}
								</div>
								<div className="user-info__more">
									{inputsMore.map((input, i) => (
										<FormControls
											key={i}
											{...input}
											resizable
										/>
									))}
								</div>
								<PopupValidate
									handleValidate={handleSubmit}
									text="êtes vous sûr de vouloir modifier votre profil ?"
								>
									<FormControls
										{...inputs.password}
										color="white-txt"
									/>
								</PopupValidate>
							</>
						) : (
							<>
								<h3 className="user-info__name">
									<span>{user.firstname}</span>
									<span>{user.lastname}</span>
								</h3>
								<div className="user-info__more">
									{isMyProfile && <p>{user.email}</p>}
								</div>
							</>
						)}
					</div>
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
