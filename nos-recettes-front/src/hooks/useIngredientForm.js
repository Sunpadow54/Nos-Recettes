import { useState, useEffect, useMemo } from "react";
// Import components
import useFetch from "./useFetch";

function useIngredientForm(ingredient) {
	const [ingredientForm, setIngredientForm] = useState([""]);

	// -------- API

	const { data, error, sendToApi } = useFetch({
		endpoint: ingredient ? "/ingredient/" + ingredient.id : "/ingredient",
		method: ingredient ? "PUT" : "POST",
		body: ingredientForm,
		wait: true,
		auth: true,
	});

	// --------- Handles

	const handleInputChange = (e) => {
		const index = e.target.name.split("-")[1];
		let newIngr = [...ingredientForm];
		newIngr[index] = e.target.value;
		setIngredientForm(newIngr);
	};

	const handleAddInput = () => {
		let ingredients = [...ingredientForm];
		ingredients.push("");
		setIngredientForm(ingredients);
	};

	const handleRemoveInput = (index) => {
		let ingredients = [...ingredientForm];
		ingredients.splice(index, 1);
		setIngredientForm(ingredients);
	};

	const handleEdit = (e) => {
		e.preventDefault();
		sendToApi();
	};

	const handleCreate = (e) => {
		e.preventDefault();
		sendToApi();
	};

	// --------- Props

	const inputs = useMemo(() => {
		let props = [];
		ingredientForm.forEach((ingr, i) => {
			props.push({
				type: "text",
				name: `ingredients-${i}`,
				label: `ingrédient ${i + 1}`,
				value: ingredientForm[i],
				onChange: handleInputChange,
				noRequired: true,
			});
		});
		return props;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ingredientForm]);

	// --------- Effects

	useEffect(() => {
		if (ingredient) {
			setIngredientForm([ingredient.name]);
		}
	}, [ingredient]);

	return {
		handleEdit,
		handleCreate,
		handleAddInput,
		handleRemoveInput,
		inputs,
		data,
	};
}

export default useIngredientForm;
