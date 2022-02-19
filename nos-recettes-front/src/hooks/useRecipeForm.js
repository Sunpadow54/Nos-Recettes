import { useState, createRef, useMemo, useEffect } from "react";

function useRecipeForm({ recipe }) {
	const [preparations, setPreparations] = useState([""]);
	const [ingredients, setIngredients] = useState([]);

	// ----- Refs create
	const stepsRefs = useMemo(() => {
		let refs = [];
		preparations.forEach((step, i) => {
			refs[i] = createRef(null);
		});
		return refs;
	}, [preparations]);

	const ingredientsRefs = useMemo(() => {
		let refs = [];
		ingredients.forEach((ingredient, i) => {
			refs[i] = [];
			ingredient.forEach((part, x) => {
				refs[i][x] = createRef(null);
			});
		});
		return refs;
	}, [ingredients]);

	const formRefs = {
		title: createRef(null),
		duration: createRef(null),
		category: createRef(null),
		preparation: stepsRefs,
		ingredients: ingredientsRefs,
	};

	// ----- Functions Create inputs Props
	const createPropsPreps = () => {
		let props = [];
		preparations.forEach((step, i) => {
			props.push({
				formType: "textarea",
				name: `preparation-${i}`,
				ref: formRefs.preparation[i],
				defaultValue: step,
			});
		});
		return props;
	};
	const createPropsIngr = () => {
		let props = [];
		ingredients.forEach((ing, i) => {
			props.push([
				{
					type: "text",
					name: `ingredients-${i}-0`,
					//label: `ingrédient ${i + 1}`,
					ref: formRefs.ingredients[i][0],
					options: ["truc", "chose", "bidule"],
					list: "ingredients",
					defaultValue: ing[0],
				},
				{
					type: "number",
					name: `ingredients-${i}-1`,
					//label: `qté`,
					ref: formRefs.ingredients[i][1],
					//labelTop: true,
					defaultValue: ing[1],
				},
				{
					type: "text",
					name: `ingredients-${i}-2`,
					//label: "mesure",
					ref: formRefs.ingredients[i][2],
					options: ["truc", "chose", "bidule"],
					list: "units",
					noRequired: true,
					defaultValue: ing[2],
				},
			]);
		});
		return props;
	};

	// All inputs props
	const inputsProps = {
		title: {
			type: "text",
			name: "title",
			//label: "Titre",
			defaultValue: recipe && recipe.title,
			ref: formRefs.title,
		},
		duration: {
			type: "time",
			name: "duration",
			//label: "durée",
			defaultValue: recipe && recipe.duration,
			ref: formRefs.duration,
		},
		category: {
			formType: "select",
			name: "category",
			//label: "catégorie",
			defaultValue: recipe && recipe.category,
			options: ["entrée", "plat", "dessert", "autre"],
			ref: formRefs.category,
		},
		preparation: createPropsPreps(),
		ingredients: createPropsIngr(),
	};

	// -------- Handles

	const handleRemoveInput = (inputType, index) => {
		let newData;
		if (inputType === "ingredients") {
			newData = ingredients;
			newData.splice(index, 1); // remove
			setIngredients([...newData]);
		}
		if (inputType === "preparations") {
			newData = preparations;
			newData.splice(index, 1); // remove
			setPreparations([...newData]);
		}
	};

	const handleSubmit = () => {
		console.log("submit");
	};

	// --------- Effects
	useEffect(() => {
		if (recipe) {
			setPreparations(recipe.preparation);
			setIngredients(
				recipe.ingredients.map((e) => {
					return Object.values(e);
				})
			);
		}
	}, [recipe]);

	return {
		formRefs,
		inputsProps,
		ingredients,
		preparations,
		handleRemoveInput,
		handleSubmit,
	};
}

export default useRecipeForm;
