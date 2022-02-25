import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
/* Import Style */
import "./createRecipe.scss";
/* Import Icons */
import { IoMdAdd } from "react-icons/io";
/* Import Components */
import useRecipeForm from "../../../hooks/useRecipeForm";
import FormControls from "../../../components/FormControls/FormControls";
import FormControlsList from "../../../components/FormControls/FormControlsList";
import BtnBrand from "../../../components/Buttons/BtnBrand";

function CreateRecipe() {
	const { setTitle } = useOutletContext();

	const {
		state,
		inputs,
		inputStep,
		inputIngredient,
		handleAddInput,
		handleRemoveInput,
		handleCreate,
	} = useRecipeForm();

	const BtnAdd = ({ label, type }) => {
		return (
			<BtnBrand
				icon={<IoMdAdd />}
				round
				color="blue"
				label={label}
				onClick={() => handleAddInput(type)}
			/>
		);
	};

	useEffect(() => {
		setTitle("Créer sa recette");
	}, [setTitle]);

	return (
		<form
			autoComplete="off"
			id="create"
			className="create-recipe-form form"
			onSubmit={handleCreate}
		>
			{Object.keys(inputs).map((i) => (
				<FormControls key={i} {...inputs[i]} />
			))}

			<fieldset className="form-group">
				<legend className="form-group__legend"> Préparation : </legend>
				{state.preparation.map((step, i) => (
					<FormControlsList
						key={i}
						inputprops={inputStep[i]}
						handleRemoveInput={(e) => {
							handleRemoveInput("removeSteps", i);
						}}
					/>
				))}
				<div className="form-group__btn">
					<BtnAdd label="Ajouter une étape" type="addSteps" />
				</div>
			</fieldset>

			<fieldset className="form-group">
				<legend className="form-group__legend">Ingrédients</legend>
				{state.ingredients.map((ingredient, i) => (
					<FormControlsList
						key={i}
						inputprops={inputIngredient[i]}
						handleRemoveInput={(e) => {
							handleRemoveInput("removeIng", i);
						}}
					/>
				))}
				<div className="form-group__btn">
					<BtnAdd label="Ajouter un ingrédient" type="addIng" />
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
