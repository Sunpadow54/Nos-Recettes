import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import classNames from "classnames";
/* Import Style */
import "./profile.scss";
// Import components
import Input from "../../../components/FormControls/Input";
import BtnBrand from "../../../components/Buttons/BtnBrand";

function EditProfile() {
	const userId = 2; // test
	const [user, setUser] = useOutletContext()[0];
	const nameWidth = useOutletContext()[1];
	const navigate = useNavigate();
	const [userForm, setUserForm] = useState({});
	const [hidePopup, setHidePopup] = useState(true);

	// ---- Inputs

	// inputs values are by default user, or from userform (if they changed)
	const getValues = (key) => {
		return userForm.hasOwnProperty(key) ? userForm[key] : user[key];
	};
	const inputsName = [
		{
			type: "text",
			name: "firstname",
			label: "Prénom",
			light: true,
			resizable: true,
			size: "1",
			value: user && getValues("firstname"),
			style: nameWidth.firstname,
		},
		{
			type: "text",
			name: "lastname",
			label: "Nom",
			light: true,
			resizable: true,
			size: "1",
			value: user && getValues("lastname"),
			style: nameWidth.lastname,
		},
	];
	const inputsMore = [
		{
			type: "email",
			name: "email",
			label: "email",
			light: true,
			resizable: true,
			value: user && getValues("email"),
		},
		{
			type: "text",
			name: "username",
			label: "Username",
			light: true,
			resizable: true,
			value: user && getValues("username"),
		},
		{
			type: "password",
			name: "newPassword",
			label: "nouveau mot de passe",
			light: true,
			resizable: true,
			value: userForm.newPassword,
		},
	];

	// ---- Handles

	const handleInputChange = (e) => {
		// populate Form
		const { name, value } = e.target;
		setUserForm({
			...userForm,
			[name]: value,
		});
		// change size of parent div with dataset
		if (e.target.type !== "password") {
			e.target.parentNode.dataset.value = value;
		}
		// change color of input if modified
		if (value === user[name] || name === "oldPassword") {
			e.target.classList.remove("blue-txt");
		} else {
			e.target.classList.add("blue-txt");
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault(); // stop refreshing page
		fetch("http://localhost:3000/api/user/" + userId, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(userForm),
		})
			.then((res) => {
				return res.json();
			})
			.then((newUser) => {
				// change user displayed
				setUser({
					...user,
					...newUser,
				});
				// return to profile
				navigate("/profil");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handlePopup = (e) => {
		e.preventDefault();
		setHidePopup(!hidePopup);
	};

	return (
		<form
			autoComplete="off"
			id="edit-profile"
			className="profile-info__group profile-form"
		>
			{user && (
				<>
					<div className="profile-info__name">
						{inputsName.map((input, i) => (
							<Input
								key={i}
								{...input}
								noRequired
								onChange={handleInputChange}
							/>
						))}
					</div>
					<div className="profile-info__more">
						{inputsMore.map((input, i) => (
							<Input
								key={i}
								{...input}
								noRequired
								onChange={handleInputChange}
							/>
						))}
					</div>

					<div className="profile-form__submit">
						<BtnBrand
							text="Enregistrer"
							color="green"
							onClick={handlePopup}
						/>
					</div>
					<div
						className={classNames(
							"profile-form__popup",
							hidePopup && "profile-form__popup--hide"
						)}
					>
						<p>êtes vous sûr de vouloir modifier votre profil ?</p>
						<Input
							type="password"
							name="oldPassword"
							label="mot de passe"
							light
							color="white"
							value={userForm.newPassword}
							onChange={handleInputChange}
						/>
						<div className="profile-form__btns">
							<BtnBrand
								form="edit-profile"
								type="submit"
								text="oui"
								color="green"
								onClick={handleSubmit}
							/>
							<BtnBrand
								text="annuler"
								color="light"
								onClick={handlePopup}
							/>
						</div>
					</div>
				</>
			)}
		</form>
	);
}

export default EditProfile;
