import { useState, useEffect, useReducer } from "react";
// Import components
import useFetch from "./useFetch";

function reducerUserForm(state, action) {
	switch (action.type) {
		case "update_all": {
			return { ...action.old };
		}
		case "update":
			return { ...state, [action.key]: action.value };
		default:
			return;
	}
}

const initialUserForm = {
	firstname: "",
	lastname: "",
	email: "",
	username: "",
	password: "",
};

function useUserForm({ user, id }) {
	const [state, dispatch] = useReducer(reducerUserForm, initialUserForm);
	const [userForm, setUserForm] = useState(null);

	// -------- API

	const {
		data,
		error,
		sendToApi,
	} = useFetch({
		endpoint: user ? "/user/" + id : "/user/create",
		method: user ? "PUT" : "POST",
		body: userForm,
		wait: true,
		auth: true,
	});

	// --------- Handles

	const handleInputChange = (e) => {
		const { value, name } = e.target;
		dispatch({ type: "update", key: name, value: value });
	};

	const handleEdit = (e) => {
		e.preventDefault();
		let data = { password: state.password };
		for (const [key, value] of Object.entries(state)) {
			if (user[key] && value !== user[key]) {
				data[key] = value;
			}
		}
		// add new password if it changed
		if (state.newPassword) {
			data["newPassword"] = state.newPassword;
		}
		setUserForm(data);
		sendToApi();
	};

	const handleCreate = (e) => {
		e.preventDefault();
		setUserForm(state);
		sendToApi();
	};

	// --------- Props

	const inputs = {
		firstname: {
			type: "text",
			name: "firstname",
			label: "Prénom",
			value: state.firstname,
			onChange: handleInputChange,
		},
		lastname: {
			type: "text",
			name: "lastname",
			label: "Nom",
			value: state.lastname,
			onChange: handleInputChange,
		},
		email: {
			type: "email",
			name: "email",
			label: "email",
			value: state.email,
			onChange: handleInputChange,
		},
		username: {
			type: "text",
			name: "username",
			label: "Username",
			value: state.username,
			onChange: handleInputChange,
		},
		newPassword: {
			type: "password",
			name: "newPassword",
			label: "nouveau mot de passe",
			labelTop: true,
			value: state.newPassword,
			onChange: handleInputChange,
		},
		password: {
			type: "password",
			name: "password",
			label: "mot de passe",
			value: state.password,
			onChange: handleInputChange,
		},
	};

	// --------- Effects

	useEffect(() => {
		if (user) {
			const currentUser = {
				firstname: user.firstname,
				lastname: user.lastname,
				email: user.email,
				username: user.username,
				newPassword: "",
				password: "",
			};
			dispatch({ type: "update_all", old: currentUser });
		}
	}, [user]);

	return { handleEdit, handleCreate, error, inputs, data };
}

export default useUserForm;
