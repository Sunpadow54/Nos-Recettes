import { useState } from "react";
/* Import Style */
import "./createRecipe.scss";
/* Import Icons */
import { GrAdd } from "react-icons/gr";
/* Import Components */
import Input from "../../../components/Inputs/Input";

function CreateRecipe() {
	const [formValues, setFormValues] = useState({
		title: "",
		duration: "",
		preparation: [""],
		category: "",
	});

	const inputs = [
		{
			name: "title",
			type: "text",
			label: "Titre :",
		},
		{
			name: "duration",
			type: "time",
			label: "Temps de préparation :",
		},
		{
			name: "category",
			options: ["entrée", "plat", "dessert", "autre"],
			label: "Choisissez une catégorie :",
		},
	];

	const handleInputChange = (e) => {
		const { name, value, id } = e.target;

		if (name === "preparation") {
			const newData = { ...formValues };
			newData.preparation[id] = value;
			setFormValues({ ...newData });
		} else {
			setFormValues({
				...formValues,
				[name]: value,
			});
		}
	};

	const handleAddStep = (e) => {
		e.preventDefault();
		const newData = { ...formValues };
		newData.preparation.push("");
		setFormValues({ ...newData });
	};

	const handleSubmit = (e) => {
		e.preventDefault(); // stop refreshing page
		console.log(formValues);
	};

	return (
		<form
			id="create"
			className="create-recipe-form form"
			onSubmit={handleSubmit}
		>
			{inputs.map((input, id) => (
				<Input
					key={id}
					{...input}
					value={formValues[input.name]}
					onChange={handleInputChange}
				/>
			))}

			<fieldset className="form-group">
				<legend className="form-group__legend"> Préparation : </legend>

				{formValues.preparation.map((step, i) => (
					<Input
						key={i}
						onChange={handleInputChange}
						value={step}
						id={i}
						label={`étape ${i + 1} :`}
						type="textarea"
						name="preparation"
					/>
				))}

				<button className="form-group__btn" onClick={handleAddStep}>
					<GrAdd />
					<span className="form-group__btn--label">
						Ajouter une étape
					</span>
				</button>
			</fieldset>

			<button form="create" type="submit" className="form__submit-btn">
				Enregistrer
			</button>
		</form>
	);
}

export default CreateRecipe;
