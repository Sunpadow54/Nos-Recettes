import { useState, useEffect } from "react";
import classNames from "classnames";
/* Import Style */
import "./user.scss";
// Import components
import useFetch from "../../apiFetch/useFetch";
import Input from "../FormControls/Input";
import BtnBrand from "../Buttons/BtnBrand";

function UserForm({ user, setUser, userId, nameWidth, setEdit }) {
	const [userForm, setUserForm] = useState({});
	const [hidePopup, setHidePopup] = useState(true);

	const {
		data: userChange,
		error,
		sendToApi,
	} = useFetch({
		endpoint: "/user/" + userId,
		method: "PUT",
		body: userForm,
		wait: true,
		auth: true,
	});

	// ---- Inputs

	const getValues = (key) => {
		if (userForm.hasOwnProperty(key)) return userForm[key];
		if (user.hasOwnProperty(key)) return user[key];
		return "";
	};
	const inputsName = [
		{
			type: "text",
			name: "firstname",
			label: "Prénom",
			light: true,
			resizable: true,
			size: "1",
			style: nameWidth.firstname,
		},
		{
			type: "text",
			name: "lastname",
			label: "Nom",
			light: true,
			resizable: true,
			size: "1",
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
		},
		{
			type: "text",
			name: "username",
			label: "Username",
			light: true,
			resizable: true,
		},
		{
			type: "password",
			name: "newPassword",
			label: "nouveau mot de passe",
			light: true,
			resizable: true,
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
		sendToApi();
		setHidePopup(!hidePopup);
	};

	const handlePopup = (e) => {
		e.preventDefault();
		setHidePopup(!hidePopup);
	};

	// ---- Effects

	// change user with modified data
	useEffect(() => {
		if (userChange) {
			setUser({
				...user,
				...userChange,
			});
			setEdit(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userChange]);

	return (
		<>
			<form
				autoComplete="off"
				id="edit-profile"
				className="user-form user-info"
			>
				<div className="user-info__name">
					{inputsName.map((input, i) => (
						<Input
							key={i}
							{...input}
							noRequired
							onChange={handleInputChange}
							value={user && getValues(input.name)}
						/>
					))}
				</div>
				<div className="user-info__more">
					{inputsMore.map((input, i) => (
						<Input
							key={i}
							{...input}
							noRequired
							onChange={handleInputChange}
							value={user && getValues(input.name)}
						/>
					))}
				</div>
				<p>{error && error.error}</p>
				<div className="user-form__submit">
					<BtnBrand
						text="Enregistrer"
						color="green"
						onClick={handlePopup}
					/>
				</div>
				<div
					className={classNames(
						"user-form__popup",
						hidePopup && "user-form__popup--hide"
					)}
				>
					<p>êtes vous sûr de vouloir modifier votre profil ?</p>
					<Input
						type="password"
						name="oldPassword"
						label="mot de passe"
						light
						color="white"
						value={userForm.oldPassword ? userForm.oldPassword : ""}
						onChange={handleInputChange}
					/>
					<div className="user-form__btns">
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
			</form>
		</>
	);
}

export default UserForm;
