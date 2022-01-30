import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
/* Import Style */
import "./profile.scss";
// Import components
import Input from "../../../components/FormControls/Input";
import BtnBrand from "../../../components/Buttons/BtnBrand";

function EditProfile() {
	const userId = 2; // test
	const navigate = useNavigate();
	const [userForm, setUserForm] = useState({});
	const { user, inputWidth } = useOutletContext();
	const inputsName = [
		{
			type: "text",
			name: "firstname",
			label: "Prénom",
			light: true,
			resizable: true,
			size: "1",
		},
		{
			type: "text",
			name: "lastname",
			label: "Nom",
			light: true,
			resizable: true,
			size: "1",
		},
	];
	const inputsMore = [
		{
			type: "text",
			name: "username",
			label: "Username",
			light: true,
			resizable: true,
		},
		{
			type: "email",
			name: "email",
			label: "email",
			light: true,
			resizable: true,
		},
		{
			type: "password",
			name: "oldPassword",
			label: "mot de passe pour valider",
			light: true,
		},
	];

	// ---- Functions
	// -> inputs values showned are default or input change
	const getValues = (key) => {
		return userForm.hasOwnProperty(key) ? userForm[key] : user[key];
	};

	const handleInputChange = (e) => {
		// populate form
		const { name, value } = e.target;
		setUserForm({
			...userForm,
			[name]: value,
		});
		// change size of parent div with dataset
		if (e.target.type !== "password") {
			e.target.parentNode.dataset.value = value;
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault(userForm); // stop refreshing page
		fetch("http://localhost:3000/api/user/" + userId, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(userForm),
		})
			.then((res) => {
				navigate("/profil");
				console.log(res.json());
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<form
			autoComplete="off"
			id="edit-profile"
			onSubmit={handleSubmit}
			className="profile-info__group"
		>
			{user && (
				<>
					<div className="profile-info__name">
						{inputsName.map((input, i) => (
							<Input
								key={i}
								{...input}
								value={getValues(input.name)}
								style={inputWidth[input.name]}
								onChange={handleInputChange}
							/>
						))}
					</div>
					<div className="profile-info__more">
						{inputsMore.map((input, i) => (
							<Input
								key={i}
								{...input}
								value={getValues(input.name)}
								onChange={handleInputChange}
							/>
						))}
					</div>
					<div>
						<BtnBrand
							form="edit-profile"
							type="submit"
							text="Enregistrer"
							color="green"
						/>
					</div>
				</>
			)}
		</form>
	);
}

export default EditProfile;
