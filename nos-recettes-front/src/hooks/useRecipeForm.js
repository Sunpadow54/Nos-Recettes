import { useEffect, useReducer, useState, useMemo } from "react";
import useFetch from "./useFetch";

// function compare (for edit)
function hasChange(obj, oldObj) {
	if (obj.length !== oldObj.length) return true;
	const array = Object.values(obj); // cause obj is collection array
	if (array.some((e) => Array.isArray(e))) {
		let result = false;
		array.forEach((element, i) => {
			result = element.some((el, j) => el !== oldObj[i][j]);
		});
		return result;
	}
	return array.some((element, i) => element !== oldObj[i]);
}

function reducerRecipeForm(state, action) {
	switch (action.type) {
		case "update_all": {
			return { ...action.old };
		}
		case "update":
			return { ...state, [action.key]: action.value };
		case "updateSteps":
			return {
				...state,
				preparation: state.preparation.map((el, i) =>
					i === action.i ? action.value : el
				),
			};
		case "updateIngr":
			return {
				...state,
				ingredients: state.ingredients.map((ing, i) =>
					i === action.i
						? ing.map((e, j) => (j === action.j ? action.value : e))
						: ing
				),
			};
		case "addSteps":
			return {
				...state,
				preparation: [...state.preparation, ""],
			};
		case "addIng":
			return {
				...state,
				ingredients: [...state.ingredients, ["", "", ""]],
			};
		case "removeSteps":
			let newSteps = [...state.preparation];
			newSteps.splice(action.index, 1);
			return { ...state, preparation: newSteps };
		case "removeIng":
			let newIng = [...state.ingredients];
			newIng.splice(action.index, 1);
			return { ...state, ingredients: newIng };
		default:
			return;
	}
}

const initialForm = {
	title: "",
	duration: "",
	category: "",
	preparation: [""],
	ingredients: [["", "", ""]],
};

function useRecipeForm(recipe) {
	const [state, dispatch] = useReducer(reducerRecipeForm, initialForm);
	const [recipeForm, setRecipeForm] = useState(null);
	const [suggestedOptions, setsuggestedOptions] = useState([]);
	const { data: allIngredients } = useFetch({
		endpoint: "/ingredient",
		method: "GET",
		auth: true,
	});
	const allUnits = [
		{ name: "mg" },
		{ name: "g" },
		{ name: "kg" },
		{ name: "ml" },
		{ name: "cl" },
		{ name: "l" },
		{ name: "tasse" },
		{ name: "pinc??e" },
		{ name: "cuill??re ?? caf??" },
		{ name: "cuill??re ?? soupe" },
		{ name: "noix" },
		{ name: "noisette" },
	];
	const { data: newRecipe, sendToApi } = useFetch({
		endpoint: recipe ? "/recipe/" + recipe.id : "/recipe",
		method: recipe ? "PUT" : "POST",
		body: recipeForm,
		wait: true,
		auth: true,
	});

	// --------- Handles

	const handleInputChange = (e) => {
		const { value } = e.target;
		const arrayName = e.target.name.split("-");
		const name = arrayName[0];
		// for ingredients
		if (arrayName[2]) {
			dispatch({
				type: "updateIngr",
				i: parseInt(arrayName[1]),
				j: parseInt(arrayName[2]),
				value: value,
			});
			// for preparations
		} else if (arrayName[1]) {
			dispatch({
				type: "updateSteps",
				i: parseInt(arrayName[1]),
				value: value,
			});
		} else {
			dispatch({ type: "update", key: name, value: value });
		}
	};

	const handleAutoComplete = (e, arrayToSearch) => {
		if (e.target.value !== "") {
			const nameArray = arrayToSearch.map((el) => el.name); // get only name as array to search from
			const result = nameArray.filter((element) =>
				element.startsWith(e.target.value)
			);
			setsuggestedOptions(result);
		}
	};

	const handleAddInput = (type) => {
		dispatch({ type: type });
	};

	const handleRemoveInput = (type, index) => {
		dispatch({ type: type, index: index });
	};

	const handleCreate = (e) => {
		e.preventDefault();
		setRecipeForm(state);
		sendToApi();
	};

	const handleEdit = (e) => {
		e.preventDefault();
		let data = {};
		for (const [key, value] of Object.entries(state)) {
			if (typeof value === "string" && value !== recipe[key]) {
				data[key] = value;
			} else if (hasChange(value, recipe[key])) {
				data[key] = value;
			}
		}
		setRecipeForm(data);
		sendToApi();
	};

	// --------- Props

	const inputs = {
		title: {
			type: "text",
			name: "title",
			label: "Titre",
			value: state.title,
			onChange: handleInputChange,
		},
		duration: {
			type: "time",
			name: "duration",
			label: "temps de pr??paration :",
			value: state.duration,
			onChange: handleInputChange,
		},
		category: {
			formType: "select",
			name: "category",
			label: "choisissez une cat??gorie",
			value: state.category,
			options: ["entr??e", "plat", "dessert", "autre"],
			onChange: handleInputChange,
		},
	};

	const inputStep = useMemo(() => {
		let props = [];
		state.preparation.forEach((step, i) => {
			props.push({
				formType: "textarea",
				name: `preparation-${i}`,
				label: `??tape ${i + 1}`,
				value: state.preparation[i],
				onChange: handleInputChange,
			});
		});
		return props;
	}, [state.preparation]);

	const inputIngredient = useMemo(() => {
		let props = [];
		state.ingredients.forEach((ing, i) => {
			props.push([
				{
					type: "text",
					name: `ingredients-${i}-0`,
					label: `ingr??dient ${i + 1}`,
					value: state.ingredients[i][0],
					options: suggestedOptions,
					list: "ingredients",
					onChange: handleInputChange,
					onKeyUp: (e) => handleAutoComplete(e, allIngredients),
				},
				{
					type: "number",
					name: `ingredients-${i}-1`,
					label: `quantit??`,
					value: state.ingredients[i][1],
					onChange: handleInputChange,
				},
				{
					type: "text",
					name: `ingredients-${i}-2`,
					label: "unit?? de mesure",
					value: state.ingredients[i][2],
					options: suggestedOptions,
					list: "units",
					noRequired: true,
					onChange: handleInputChange,
					onKeyUp: (e) => handleAutoComplete(e, allUnits),
				},
			]);
		});
		return props;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.ingredients, suggestedOptions]);

	// --------- Effects

	useEffect(() => {
		if (recipe) {
			const formatIngr = recipe.ingredients.map((ing) =>
				Object.values(ing)
			);
			const oldRecipeState = {
				title: recipe.title,
				duration: recipe.duration,
				category: recipe.category,
				preparation: recipe.preparation,
				ingredients: formatIngr,
			};
			dispatch({ type: "update_all", old: oldRecipeState });
		}
	}, [recipe]);

	return {
		state,
		inputs,
		handleAddInput,
		handleRemoveInput,
		inputStep,
		inputIngredient,
		handleCreate,
		handleEdit,
	};
}

export default useRecipeForm;
