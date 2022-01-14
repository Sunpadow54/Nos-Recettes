import { useState } from "react";
/* Import Style */
import "./createRecipe.scss";
/* Import Icons */
import { IoMdAdd } from "react-icons/io";
/* Import Components */
import Input from "../../../components/FormControls/Input";
import Textarea from "../../../components/FormControls/Textarea";
import Select from "../../../components/FormControls/Select";
import BtnBrand from "../../../components/Buttons/BtnBrand";

function CreateRecipe() {
	// ------ Variables
	const [formValues, setFormValues] = useState({
		recipe: {
			title: "",
			duration: "",
			preparation: [""],
			category: "",
		},
		ingredients: [["", "", ""]],
	});

	const [ingredientsFound, setIngredientsFound] = useState([]);
	const allIngredients = [
		"lasagne",
		"tomates",
		"fromage",
		"lait",
		"lentilles",
	];

	const [unitsFound, setUnitsFound] = useState([]);
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

	const handleSubmit = (e) => {
		e.preventDefault(); // stop refreshing page
		console.log(formValues);
	};

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
						type="textarea"
						name={`preparation-${i}`}
						label={`étape ${i + 1} :`}
						value={step}
						onChange={handleInputChange}
					/>
				))}
				<div className="form-group__btn">
					<BtnBrand
						onClick={(event) => handleAddInput(event, "step")}
						icon={<IoMdAdd />}
						label="Ajouter un ingrédient"
						round={true}
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
							label="ingrédient"
							value={formValues.ingredients[i][0]}
							onChange={handleInputChange}
							onKeyUp={(event) =>
								handleAutoComplete(
									event,
									allIngredients,
									setIngredientsFound
								)
							}
							options={ingredientsFound}
							list="ingredients"
						/>
						<Input
							type="number"
							name={`ingredients-${i}-1`}
							label="quantité"
							value={formValues.ingredients[i][1]}
							onChange={handleInputChange}
						/>
						<Input
							type="text"
							name={`ingredients-${i}-2`}
							label=" unité de mesure"
							value={formValues.ingredients[i][2]}
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
						/>
					</div>
				))}
				<div className="form-group__btn">
					<BtnBrand
						onClick={(event) => handleAddInput(event, "ingredient")}
						icon={<IoMdAdd />}
						label="Ajouter une étape"
						round={true}
						color="blue"
					/>
				</div>
			</fieldset>

			<div className="form__submit-btn">
				<BtnBrand
					form="create"
					type="submit"
					text="Enregistrer"
					color="green" /* round={false} */
				/>
			</div>
		</form>
	);
}

export default CreateRecipe;
