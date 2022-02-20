import { useState, createRef } from "react";
// Import components
import useFetch from "./useFetch";

function useUserForm({ user, id }) {
	const [userForm, setUserForm] = useState(null);
	// -------Refs
	const refs = {
		firstname: createRef(null),
		lastname: createRef(null),
		email: createRef(null),
		username: createRef(null),
		newPassword: createRef(null),
		password: createRef(null),
	};
	// All inputs props
	const inputs = {
		firstname: {
			type: "text",
			name: "firstname",
			label: "Prénom",
			ref: refs.firstname,
			defaultValue: user && user.firstname,
		},
		lastname: {
			type: "text",
			name: "lastname",
			label: "Nom",
			ref: refs.lastname,
			defaultValue: user && user.lastname,
		},
		email: {
			type: "email",
			name: "email",
			label: "email",
			ref: refs.email,
			defaultValue: user && user.email,
		},
		username: {
			type: "text",
			name: "username",
			label: "Username",
			ref: refs.username,
			defaultValue: user && user.username,
		},
		newPassword: {
			type: "password",
			name: "newPassword",
			label: "nouveau mot de passe",
			ref: refs.newPassword,
			labelTop: true,
		},
		password: {
			type: "password",
			name: "password",
			label: "mot de passe",
			ref: refs.password,
		},
	};

	// -------- API
	// Edit User
	const {
		data: userChanged,
		error,
		sendToApi,
	} = useFetch({
		endpoint: "/user/" + id,
		method: "PUT",
		body: userForm,
		wait: true,
		auth: true,
	});

	// ----- Handles
	const handleSubmit = (e) => {
		e.preventDefault(); // stop refreshing page
		let data;
		Object.values(refs).forEach((e) => {
			const { name, value, defaultValue } = e.current;
			if (value !== defaultValue) {
				data = {
					...data,
					[name]: value,
				};
			}
		});
		setUserForm(data);
		sendToApi();
	};

	return { handleSubmit, error, inputs, userChanged };
}

export default useUserForm;
