import { useState, useEffect, useReducer, useMemo } from "react";
// Import components
import useFetch from "./useFetch";

function useIngredientForm() {
	const [ingredientForm, setIngredientForm] = useState([""]);

	// -------- API

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
	};

	const handleCreate = (e) => {
		e.preventDefault();
		console.log(ingredientForm);
	};

	// --------- Props

	const inputs = useMemo(() => {
		let props = [];
		ingredientForm.forEach((ingredient, i) => {
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

	return {
		handleEdit,
		handleCreate,
		handleAddInput,
		handleRemoveInput,
		inputs,
	};
}

export default useIngredientForm;
