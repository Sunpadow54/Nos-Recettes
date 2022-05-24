import { useState, useEffect, useMemo } from "react";
// Components
import useFetch from "./useFetch";

function useIngredientForm(oldIngredient) {
	const [ingrForm, setIngrForm] = useState([""]);
	const [request, setRequest] = useState({
		method: "POST",
		endpoint: "/ingredient",
		body: null,
	});

	// -------- API

	const { data, error, sendToApi } = useFetch({
		...request,
		wait: true,
		auth: true,
	});

	// --------- Handles

	const handleInputChange = (e) => {
		const index = e.target.name.split("-")[1];
		const value = e.target.value;
		let newForm = [...ingrForm];
		newForm[index] = value;

		setIngrForm(newForm);
	};

	const handleAddInput = () => {
		let ingrArray = [...ingrForm];
		ingrArray.push("");
		setIngrForm(ingrArray);
	};

	const handleRemoveInput = (index) => {
		let ingrArray = [...ingrForm];
		ingrArray.splice(index, 1);
		setIngrForm(ingrArray);
	};

	const handleCreate = (e) => {
		e.preventDefault();
		const newReq = {
			...request,
			body: ingrForm,
		};
		setRequest(newReq);
		sendToApi();
	};

	const handleEdit = (e, idIngredient) => {
		e.preventDefault();
		const index = oldIngredient.findIndex(
			(item) => item.id === idIngredient
		);
		const newReq = {
			method: "PUT",
			endpoint: "/ingredient/" + idIngredient,
			body: { name: ingrForm[index] },
		};
		setRequest(newReq);
		sendToApi();
	};

	const handleReplace = (e, oldId, newId) => {
		e.preventDefault();
		const newReq = {
			method: "PUT",
			endpoint: "/ingredient/replace/" + oldId,
			body: { id: newId },
		};
		setRequest(newReq);
		sendToApi();
	};

	const handleDelete = (e, idIngredient) => {
		e.preventDefault();
		const newReq = {
			...request,
			method: "DELETE",
			endpoint: "/ingredient/" + idIngredient,
		};
		setRequest(newReq);
		sendToApi();
	};

	// --------- Props (Inputs)

	const inputs = useMemo(() => {
		let props = [];
		ingrForm.forEach((ing, i) => {
			props.push({
				type: "text",
				name: `ingredients-${i}`,
				label: `ingrédient ${i + 1}`,
				value: ingrForm[i],
				onChange: handleInputChange,
				noRequired: true,
			});
		});
		return props;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ingrForm]);

	// --------- Effects

	useEffect(() => {
		if (oldIngredient) {
			const newIngreArray = oldIngredient.map((e) => e.name);
			setIngrForm(newIngreArray);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [oldIngredient]);

	return {
		handleEdit,
		handleReplace,
		handleCreate,
		handleDelete,
		handleAddInput,
		handleRemoveInput,
		inputs,
		data,
	};
}

export default useIngredientForm;
