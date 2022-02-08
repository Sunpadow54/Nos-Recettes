import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
/* Import Style */
import "./createRecipe.scss";
/* Import Icons */
import { IoMdAdd } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
/* Import Components */
import useFetch from "../../../apiFetch/useFetch";
import Input from "../../../components/FormControls/Input";
import Textarea from "../../../components/FormControls/Textarea";
import Select from "../../../components/FormControls/Select";
import BtnBrand from "../../../components/Buttons/BtnBrand";

function CreateRecipe() {
	const { setTitle } = useOutletContext();
	const [ingredientsFound, setIngredientsFound] = useState([]);
	const [unitsFound, setUnitsFound] = useState([]);
	const [formValues, setFormValues] = useState({
		recipe: {
			title: "",
			duration: "",
			preparation: [""],
			category: "",
		},
		ingredients: [["", "", ""]],
	});
	const { data: allIngredients } = useFetch({
		endpoint: "/ingredient",
		method: "GET",
        auth: true,
	});

	const allUnits = [
		"mg",
		"g",
		"kg",
		"ml",
		"cl",
		"l",
		"tasse",
		"pincée",
		"cuillère à café",
		"cuillère à soupe",
		"noix",
		"noisette",
	];
	const { data: recipeCreated, sendToApi } = useFetch({
		endpoint: "/recipe",
		method: "POST",
		body: formValues,
		wait: true,
        auth: true,
	});

	// ------ Handle Functions

	const handleAutoComplete = (e, arrayToSearch, set) => {
		const { value } = e.target;
		if (value !== "") {
			const result = arrayToSearch.filter((element) =>
				element.startsWith(value)
			);
			set(result);
		}
	};

	const handleInputChange = (e) => {
		const newData = { ...formValues };
		const name = e.target.name.split("-")[0];
		const index = e.target.name.split("-")[1]; // which array element is targeted
		const value = e.target.value;
		// populate newData
		if (name === "preparation") {
			newData.recipe.preparation[index] = value;
		} else if (name === "ingredients") {
			const index2 = e.target.name.split("-")[2];
			newData.ingredients[index][index2] = value;
		} else {
			newData.recipe[name] = value;
		}
		// set values
		setFormValues({ ...newData });
	};

	const handleAddInput = (e, type) => {
		e.preventDefault(); // stop refreshing page
		const newData = { ...formValues };
		if (type === "step") {
			newData.recipe.preparation.push("");
		}
		if (type === "ingredient") {
			newData.ingredients.push(["", "", ""]);
		}
		setFormValues({ ...newData });
	};

	const handleRemoveInput = (e, type, index) => {
		e.preventDefault(); // stop refreshing page
		const newData = { ...formValues };
		if (type === "step") {
			newData.recipe.preparation.splice(index, 1);
		}
		if (type === "ingredient") {
			newData.ingredients.splice(index, 1);
		}
		setFormValues({ ...newData });
	};

	const handleSubmit = (e) => {
		e.preventDefault(); // stop refreshing page
		sendToApi();
	};

	useEffect(() => {
		setTitle("Créer sa recette");
	}, [setTitle]);

	return (
		<form
			autoComplete="off"
			id="create"
			className="create-recipe-form form"
			onSubmit={handleSubmit}
		>
			<Input
				type="text"
				name="title"
				label="Titre :"
				value={formValues.recipe.title}
				onChange={handleInputChange}
			/>

			<Input
				type="time"
				name="duration"
				label="Temps de préparation :"
				value={formValues.recipe.duration}
				onChange={handleInputChange}
			/>

			<Select
				name="category"
				label="Choisissez une catégorie :"
				value={formValues.recipe.category}
				onChange={handleInputChange}
				options={["entrée", "plat", "dessert", "autre"]}
			/>

			<fieldset className="form-group">
				<legend className="form-group__legend"> Préparation : </legend>
				{formValues.recipe.preparation.map((step, i) => (
					<Textarea
						key={i}
						name={`preparation-${i}`}
						label={`étape ${i + 1} :`}
						value={step}
						onChange={handleInputChange}
						light
						hasRemove
						handleRemoveInput={(event) =>
							handleRemoveInput(event, "step", i)
						}
					/>
				))}
				<div className="form-group__btn">
					<BtnBrand
						onClick={(event) => handleAddInput(event, "step")}
						icon={<IoMdAdd />}
						label="Ajouter une étape"
						round
						color="blue"
					/>
				</div>
			</fieldset>

			<fieldset className="form-group">
				<legend className="form-group__legend">Ingrédients</legend>
				{formValues.ingredients.map((ingredient, i) => (
					<div key={i} className="form-group__row">
						<Input
							type="text"
							name={`ingredients-${i}-0`}
							label={`ingrédient ${i + 1}`}
							value={formValues.ingredients[i][0]}
							onChange={handleInputChange}
							onKeyUp={(event) =>
								handleAutoComplete(
									event,
									allIngredients.data,
									setIngredientsFound
								)
							}
							options={ingredientsFound}
							list="ingredients"
							light
						/>
						<Input
							type="number"
							name={`ingredients-${i}-1`}
							label="quantité"
							value={formValues.ingredients[i][1]}
							onChange={handleInputChange}
							light
						/>
						<Input
							type="text"
							name={`ingredients-${i}-2`}
							label=" unité de mesure"
							value={formValues.ingredients[i][2]}
							noRequired
							onChange={handleInputChange}
							onKeyUp={(event) =>
								handleAutoComplete(
									event,
									allUnits,
									setUnitsFound
								)
							}
							options={unitsFound}
							list="units"
							light
						/>
						<BtnBrand
							icon={<IoMdClose />}
							label="suprimer"
							round
							border0
							color="grey"
							onClick={(event) =>
								handleRemoveInput(event, "ingredient", i)
							}
						/>
					</div>
				))}
				<div className="form-group__btn">
					<BtnBrand
						onClick={(event) => handleAddInput(event, "ingredient")}
						icon={<IoMdAdd />}
						label="Ajouter un ingrédient"
						round
						color="blue"
					/>
				</div>
			</fieldset>

			<div className="form__submit-btn">
				<BtnBrand
					form="create"
					type="submit"
					text="Enregistrer"
					color="green"
				/>
			</div>
		</form>
	);
}

export default CreateRecipe;
