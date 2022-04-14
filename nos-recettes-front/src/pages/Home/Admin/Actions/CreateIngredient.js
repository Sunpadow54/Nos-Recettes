import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
/* Import Style */
import "./actions.scss";
/* Import Icons */
import { IoMdAdd } from "react-icons/io";
// Import Components
import useIngredientForm from "../../../../hooks/useIngredientForm";
import FormControlsList from "../../../../components/FormControls/FormControlsList";
import BtnBrand from "../../../../components/Buttons/BtnBrand";

function CreateIngredient() {
	const { setSubtitle } = useOutletContext();
	useEffect(() => {
		setSubtitle("Ajouter un ingrédient");
	}, [setSubtitle]);

	const { inputs, handleCreate, handleAddInput, handleRemoveInput } =
		useIngredientForm(null);

	return (
		<form
			autoComplete="off"
			id="create-ingredient"
			className="action-form"
			onSubmit={handleCreate}
		>
			{inputs.map((input, index) => (
				<FormControlsList
					key={index}
					inputprops={input}
					handleRemoveInput={() => {
						handleRemoveInput(index);
					}}
				/>
			))}
			<BtnBrand
				icon={<IoMdAdd />}
				round
				color="light-blue"
				label="ajouter un ingrédient"
				onClick={handleAddInput}
			/>

			<BtnBrand
				form="create-ingredient"
				type="submit"
				text="Envoyer"
				color="green"
			/>
		</form>
	);
}

export default CreateIngredient;
